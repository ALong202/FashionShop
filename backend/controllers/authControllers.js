import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import User from "../models/user.js";
// Hàm xử lý yêu cầu đăng ký người dùng
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  // Trích xuất thông tin người dùng từ req.body sử dụng destructuring
  const {userID, name, email, password, address, phone } = req.body;

  // Tạo một người dùng mới trong cơ sở dữ liệu sử dụng mô hình User
  const user = await User.create({
    userID,
    name,
    email,
    password,
    address,
    phone,
  });

  // Trả về một phản hồi thành công với mã trạng thái HTTP 201
  res.status(201).json({
    success: true,
  });
});
