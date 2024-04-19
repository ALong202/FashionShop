import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import ErrorHandler from "../utils/errorHandler.js";

// Tạo đơn hàng mới  =>  /api/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  // Trích xuất thông tin đơn hàng từ yêu cầu
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    //taxAmount, -> Quốc: model ko có tax, a xem lại thử có cần giữ vì lí do nào khác???
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
    //taxAmount, -> Quốc: model ko có tax, a xem lại thử có cần giữ vì lí do nào khác???
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req.user._id, // Gán ID của người dùng hiện tại cho đơn hàng
  });

  // Trả về thông tin đơn hàng đã tạo với mã trạng thái 200
  res.status(200).json({
    order,
  });
});

// Lấy các đơn hàng của người dùng hiện tại  =>  /api/me/orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  // Tìm các đơn hàng của người dùng hiện tại trong cơ sở dữ liệu
  const orders = await Order.find({ user: req.user._id });
  let ordersCount = orders.length;
  // Trả về danh sách các đơn hàng với mã trạng thái 200
  res.status(200).json({
    ordersCount,
    orders,    
  });
});

// Lấy chi tiết của một đơn hàng  =>  /api/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
  // Tìm đơn hàng trong cơ sở dữ liệu bằng ID và lấy thông tin của người dùng liên quan
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  // Kiểm tra xem đơn hàng có tồn tại không
  if (!order) {
    // Nếu không tìm thấy đơn hàng, trả về lỗi với mã trạng thái 404
    return next(new ErrorHandler("Không tìm thấy đơn hàng với ID này", 404));
  }

  // Trả về thông tin chi tiết của đơn hàng với mã trạng thái 200
  res.status(200).json({
    order,
  });
});

// Lấy tất cả các đơn hàng - ADMIN  =>  /api/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
  // Tìm tất cả các đơn hàng trong cơ sở dữ liệu
  const orders = await Order.find();
  let ordersCount = orders.length;
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
    // Nếu không tìm thấy đơn hàng, trả về lỗi với mã trạng thái 404
    return next(new ErrorHandler("Không tìm thấy đơn hàng với ID này", 404));
  }

  // Kiểm tra xem đơn hàng đã được giao hàng chưa
  if (order?.orderStatus === "Delivered") {
    // Nếu đơn hàng đã được giao hàng, trả về lỗi với mã trạng thái 400
    return next(new ErrorHandler("Đơn hàng của bạn đã được giao", 400));
  }

  // Cập nhật số lượng hàng tồn kho của các sản phẩm liên quan
  order?.orderItems?.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("Không tìm thấy sản phẩm với ID này", 404));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  });

  // Cập nhật trạng thái đơn hàng và thời gian giao hàng
  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  // Lưu thay đổi vào cơ sở dữ liệu
  await order.save();

  // Trả về thành công với mã trạng thái 200
  res.status(200).json({
    success: true,
  });
});

// Xóa đơn hàng  =>  /api/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  // Tìm đơn hàng trong cơ sở dữ liệu bằng ID
  const order = await Order.findById(req.params.id);

  // Kiểm tra xem đơn hàng có tồn tại không
  if (!order) {
    // Nếu không tìm thấy đơn hàng, trả về lỗi với mã trạng thái 404
    return next(new ErrorHandler("Không tìm thấy đơn hàng với ID này", 404));
  }

  // Xóa đơn hàng khỏi cơ sở dữ liệu
  await order.deleteOne();

  // Trả về thành công với mã trạng thái 200
  res.status(200).json({
    success: true,
  });
});
