import { query } from "express";
import Product from "../models/product.js"; // Import model Product từ đường dẫn ../models/product.js
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js";

/*
Hàm điều khiển (controller functions) cho các file routes và xác định route
Các điều khiển và các logic cho tài nguyên sản phẩm (product resource)
*/

export const getProducts = async (req, res, next) => { // Khai báo hàm điều khiển getProducts nhận req và res làm tham số; next cho Toast message ở frontend

    /*
        * Tạo một bộ lọc API mới từ đối tượng Product và các tham số truy vấn (query) từ yêu cầu HTTP, 
        * sau đó thực hiện các phương thức search và filters để xây dựng truy vấn tùy chỉnh
    */ 
  const apiFilters = new APIFilters(Product, req.query).search().filters();

  // Thực hiện truy vấn dữ liệu với các bộ lọc đã được áp dụng và gán kết quả vào biến 'products'
  let products = await apiFilters.query;    

  // Đếm số lượng sản phẩm sau khi áp dụng bộ lọc
  let filteredProductsCount = products.length


   
  res.status(200).json({// Trả về mã trạng thái 200 và dữ liệu JSON chứa danh sách sản phẩm
      filteredProductsCount, //Trả về Số lượng sản phẩm đã lọc
      products, // Trả về danh sách sản phẩm
  }); 
};

//   Test frontend toast message
//   return next(new ErrorHandler("Không tìm thấy sản phẩm", 400)); 



//Tạo sản phẩm mới với đường dẫn => /api/admin/products
export const newProduct = async (req, res) => { // Khai báo hàm điều khiển newProduct nhận req và res làm tham số
    const product = await Product.create(req.body); // Tạo một sản phẩm mới từ dữ liệu được gửi trong yêu cầu và gán cho biến product
    res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa thông tin sản phẩm mới được tạo
        product, // Trả về thông tin của sản phẩm mới được tạo
    });
};


//Tìm 1 sản phẩm mới với đường dẫn => /products/:id
export const getProductDetail = async (req, res) => { // Khai báo hàm điều khiển newProduct nhận req và res làm tham số
    const product = await Product.findById(req?.params?.id ); // Tạo một sản phẩm mới từ dữ liệu được gửi trong yêu cầu và gán cho biến product

    if(!product) {
        return next(new ErrorHandler("Không tìm thấy sản phẩm", 404));   //sử dụng một instance của lớp ErrorHandler và gọi hàm next để trả về lỗi 404
    }

    res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa thông tin sản phẩm mới được tạo
        product, // Trả về thông tin của sản phẩm mới được tạo
    });
};

//Update chi tiết sản phẩm mới với đường dẫn => /products/:id
export const updateProduct = async (req, res) => { // Khai báo hàm điều khiển newProduct nhận req và res làm tham số
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
};



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





