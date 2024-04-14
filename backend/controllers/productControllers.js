import { query } from "express";
import Product from "../models/product.js"; // Import model Product từ đường dẫn ../models/product.js
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

/*
Hàm điều khiển (controller functions) cho các file routes và xác định route
Các điều khiển và các logic cho tài nguyên sản phẩm (product resource)
*/

export const getProducts = catchAsyncErrors(async (req, res) => {
  // Số sản phẩm trên mỗi trang
  const resPerPage = 4;
  // Áp dụng bộ lọc từ yêu cầu API
  const apiFilters = new APIFilters(Product, req.query).search().filters();

  // Lấy danh sách sản phẩm đã được lọc
  let products = await apiFilters.query;
  // Số lượng sản phẩm sau khi được lọc
  let filteredProductsCount = products.length;

  // Phân trang sản phẩm
  apiFilters.pagination(resPerPage);
  // Lấy lại danh sách sản phẩm sau khi phân trang
  products = await apiFilters.query.clone();

  // Trả về danh sách sản phẩm đã được lọc và phân trang
  res.status(200).json({
    resPerPage,// Số sản phẩm trên mỗi trang
    filteredProductsCount,// Số sản phẩm sau khi được lọc
    products, // Danh sách sản phẩm
  });
});
  





//Tạo sản phẩm mới với đường dẫn => /api/admin/products
export const newProduct = async (req, res) => { // Khai báo hàm điều khiển newProduct nhận req và res làm tham số
    const product = await Product.create(req.body); // Tạo một sản phẩm mới từ dữ liệu được gửi trong yêu cầu và gán cho biến product
    res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa thông tin sản phẩm mới được tạo
        product, // Trả về thông tin của sản phẩm mới được tạo
    });
};


//Tìm 1 sản phẩm mới với đường dẫn => /products/:id
export const getProductDetails = catchAsyncErrors( async (req, res) => { // Khai báo hàm điều khiển newProduct nhận req và res làm tham số
    const product = await Product.findById(req?.params?.id ); // Tạo một sản phẩm mới từ dữ liệu được gửi trong yêu cầu và gán cho biến product

    if(!product) {
        return next(new ErrorHandler("Không tìm thấy sản phẩm", 404));   //sử dụng một instance của lớp ErrorHandler và gọi hàm next để trả về lỗi 404
    }

    res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa thông tin sản phẩm mới được tạo
        product, // Trả về thông tin của sản phẩm mới được tạo
    });
});

//Update chi tiết sản phẩm mới với đường dẫn => /products/:id
export const updateProduct = catchAsyncErrors( async (req, res) => { // Khai báo hàm điều khiển newProduct nhận req và res làm tham số
    let product = await Product.findById(req?.params?.id ); // Tìm kiếm sản phẩm: sử dụng phương thức findById của Mongoose để tìm kiếm sản phẩm với ID được cung cấp trong yêu cầu (req.params.id).

    if(!product) {       //Kiểm tra sự tồn tại của sản phẩm:
        return next(new ErrorHandler("Không tìm thấy sản phẩm", 404));   //sử dụng một instance của lớp ErrorHandler và gọi hàm next để trả về lỗi 404
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true,
    });


    res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa thông tin sản phẩm mới được tạo
        product, // Trả về thông tin của sản phẩm mới được tạo
    });
});



//Xóa sản phẩm với đường dẫn => /products/:id
export const deleteProduct = async (req, res, next) => { // Khai báo hàm điều khiển newProduct nhận req và res làm tham số
  const product = await Product.findById(req?.params?.id ); // Tìm kiếm sản phẩm: sử dụng phương thức findById của Mongoose để tìm kiếm sản phẩm với ID được cung cấp trong yêu cầu (req.params.id).

  if(!product) {
    //throw new error()
      return next(new ErrorHandler("Không tìm thấy sản phẩm", 404));   //sử dụng một instance của lớp ErrorHandler và gọi hàm next để trả về lỗi 404
  }

  await product.deleteOne(); //Nếu sản phẩm tồn tại, sử dụng phương thức deleteOne để xóa sản phẩm khỏi cơ sở dữ liệu.


  res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa thông tin sản phẩm mới được xóa
      message: "Đã xóa sản phẩm",
  });
};


//   Test frontend toast message
//   return next(new ErrorHandler("Không tìm thấy sản phẩm", 400)); 




