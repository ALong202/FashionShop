import Product from "../models/product.js"; // Import model Product từ đường dẫn ../models/product.js

/*
Hàm điều khiển (controller functions) cho các file routes và xác định route
Các điều khiển và các logic cho tài nguyên sản phẩm (product resource)
*/
export const getProducts = async (req, res) => { // Khai báo hàm điều khiển getProducts nhận req và res làm tham số
    const products = await Product.find(); // Tìm tất cả các sản phẩm từ cơ sở dữ liệu và gán cho biến products
    res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa danh sách sản phẩm
        products, // Trả về danh sách sản phẩm
    }); 
};

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
        return res.status(404).json({
            error: "Sản phẩm không tồn tại",
        });        
    };

    res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa thông tin sản phẩm mới được tạo
        product, // Trả về thông tin của sản phẩm mới được tạo
    });
};

//Update chi tiết sản phẩm mới với đường dẫn => /products/:id
export const updateProduct = async (req, res) => { // Khai báo hàm điều khiển newProduct nhận req và res làm tham số
    let product = await Product.findById(req?.params?.id ); // Tạo một sản phẩm mới từ dữ liệu được gửi trong yêu cầu và gán cho biến product

    if(!product) {
        return res.status(404).json({
            error: "Sản phẩm không tồn tại",
        });         
    };

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true,
    });


    res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa thông tin sản phẩm mới được tạo
        product, // Trả về thông tin của sản phẩm mới được tạo
    });
};



//Xóa sản phẩm với đường dẫn => /products/:id
export const deleteProduct = async (req, res) => { // Khai báo hàm điều khiển newProduct nhận req và res làm tham số
  const product = await Product.findById(req?.params?.id ); // Tạo một sản phẩm mới từ dữ liệu được gửi trong yêu cầu và gán cho biến product

  if(!product) {
    //throw new error()
      return res.status(404).json({
          error: "Sản phẩm không tồn tại",
      });         
  };

  await product.deleteOne();


  res.status(200).json({ // Trả về mã trạng thái 200 và dữ liệu JSON chứa thông tin sản phẩm mới được tạo
      message: "Đã xóa sản phẩm",
  });
};





