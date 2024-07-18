import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";
import redisClient from '../utils/redisClient.js'; // Import Redis client

const CACHE_EXPIRATION = 3600; // Cache expiration time in seconds

// Tạo đơn hàng mới  =>  /api/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  // Trích xuất thông tin đơn hàng từ yêu cầu
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  // Tạo đơn hàng mới trong cơ sở dữ liệu
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id, // Gán ID của người dùng hiện tại cho đơn hàng
  });

  // Invalidate cache for myOrders and allOrders
  await redisClient.del(`myOrders:${req.user._id}`);
  await redisClient.del('allOrders');

  // Trả về thông tin đơn hàng đã tạo với mã trạng thái 200
  res.status(200).json({
    order,
  });
});

// Lấy các đơn hàng của người dùng hiện tại  =>  /api/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  const cacheKey = `myOrders:${req.user._id}`;
  const cachedOrders = await redisClient.get(cacheKey);

  if (cachedOrders) {
    return res.status(200).json(JSON.parse(cachedOrders));
  }

  // Tìm các đơn hàng của người dùng hiện tại trong cơ sở dữ liệu
  const orders = await Order.find({ user: req.user._id });
  let ordersCount = orders.length;

  await redisClient.set(cacheKey, JSON.stringify({ ordersCount, orders }), 'EX', CACHE_EXPIRATION);

  // Trả về danh sách các đơn hàng với mã trạng thái 200
  res.status(200).json({
    ordersCount,
    orders,
  });
});

// Lấy chi tiết của một đơn hàng  =>  /api/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const cacheKey = `orderDetails:${req.params.id}`;
  const cachedOrder = await redisClient.get(cacheKey);

  if (cachedOrder) {
    return res.status(200).json(JSON.parse(cachedOrder));
  }

  // Tìm đơn hàng trong cơ sở dữ liệu bằng ID và lấy thông tin của người dùng liên quan
  const order = await Order.findById(req.params.id).populate("user", "name email");

  // Kiểm tra xem đơn hàng có tồn tại không
  if (!order) {
    return next(new ErrorHandler("Không tìm thấy đơn hàng với ID này", 404));
  }

  await redisClient.set(cacheKey, JSON.stringify({ order }), 'EX', CACHE_EXPIRATION);

  // Trả về thông tin chi tiết của đơn hàng với mã trạng thái 200
  res.status(200).json({
    order,
  });
});

// Lấy tất cả các đơn hàng - ADMIN  =>  /api/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  const cacheKey = 'allOrders';
  const cachedOrders = await redisClient.get(cacheKey);

  if (cachedOrders) {
    return res.status(200).json(JSON.parse(cachedOrders));
  }

  // Tìm tất cả các đơn hàng trong cơ sở dữ liệu
  const orders = await Order.find();
  let ordersCount = orders.length;

  await redisClient.set(cacheKey, JSON.stringify({ ordersCount, orders }), 'EX', CACHE_EXPIRATION);

  // Trả về danh sách các đơn hàng với mã trạng thái 200
  res.status(200).json({
    ordersCount,
    orders,
  });
});

// Cập nhật trạng thái của đơn hàng - ADMIN  =>  /api/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  // Tìm đơn hàng trong cơ sở dữ liệu bằng ID
  const order = await Order.findById(req.params.id);

  // Kiểm tra xem đơn hàng có tồn tại không
  if (!order) {
    return next(new ErrorHandler("Không tìm thấy đơn hàng với ID này", 404));
  }

  // Trùng trạng thái thì không làm gì
  if (order?.orderStatus === req.body.status) {
    return next(new ErrorHandler("Cần chọn trạng thái mới để sửa", 400));
  }

  // Đơn hàng đang shipped thì không được chuyển về processing
  if (order?.orderStatus === "Shipped" && req.body.status === "Processing") {
    return next(new ErrorHandler("Đơn hàng đang được giao", 400));
  }

  // Kiểm tra xem đơn hàng đã được giao hàng chưa
  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("Đơn hàng đã được giao", 400));
  }

  // Cập nhật số lượng hàng tồn kho của các sản phẩm liên quan
  if (req.body.status === "Delivered") {
    order?.orderItems?.forEach(async (item) => {
      const product = await Product.findById(item?.product?.toString());
      if (!product) {
        return next(new ErrorHandler("Không tìm thấy sản phẩm với ID này", 404));
      }

      const variant = product.variants.find(
        (variant) => variant._id.toString() === item.selectedVariant.variantID
      );

      if (variant) {
        variant.stock -= item.quantity;
        variant.sellQty += item.quantity; // Cập nhật số lượng đã bán của variant
        product.sellQty += item.quantity; // Cập nhật tổng số lượng đã bán của sản phẩm
      }

      await product.save({ validateBeforeSave: false });
    });

    if (order.paymentMethod === "COD") {
      order.paymentInfo = { status: "Đã thanh toán" };
    }
  }

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  // Invalidate cache for order details and allOrders
  await redisClient.del(`orderDetails:${req.params.id}`);
  await redisClient.del('allOrders');
  await redisClient.del(`myOrders:${req.user._id}`);

  res.status(200).json({
    success: true,
    order,
  });
});

// Xóa đơn hàng  =>  /api/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Không tìm thấy đơn hàng với ID này", 404));
  }

  await order.deleteOne();

  // Invalidate cache for order details and allOrders
  await redisClient.del(`orderDetails:${req.params.id}`);
  await redisClient.del('allOrders');
  await redisClient.del(`myOrders:${req.user._id}`);

  res.status(200).json({
    success: true,
  });
});

// Get số Sales  =>  /api/admin/get_sales
export const getSales = catchAsyncErrors(async (req, res, next) => {
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);

  startDate.setUTCHours(0,0,0,0);
  endDate.setUTCHours(23,59,59,999);

  const cacheKey = `sales:${startDate.toISOString()}:${endDate.toISOString()}`;
  const cachedSales = await redisClient.get(cacheKey);

  if (cachedSales) {
    return res.status(200).json(JSON.parse(cachedSales));
  }

  const { salesData, totalSales, totalNumOrders } = await getSalesData(startDate, endDate);

  await redisClient.set(cacheKey, JSON.stringify({ totalSales, totalNumOrders, sales: salesData }), 'EX', CACHE_EXPIRATION);

  res.status(200).json({
    totalSales,
    totalNumOrders,
    sales: salesData,
  });
});
