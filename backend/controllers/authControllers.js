import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";

// Hàm xử lý yêu cầu đăng ký người dùng
//Register User => /api/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  // Trích xuất thông tin người dùng từ req.body sử dụng destructuring
  const {name, email, password, phone, address } = req.body;

  // Tạo một người dùng mới trong cơ sở dữ liệu sử dụng mô hình User
  const user = await User.create({
    name,
    email,
    password,
    phone,
    address,
  });

  sendToken(user, 201, res)
});


//Login User => /api/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  // Trích xuất thông tin người dùng từ req.body sử dụng destructuring
  const {email, password} = req.body;

    // Kiểm tra xem email và password có tồn tại không
  if(!email || !password){
    return next(new ErrorHandler("Vui lòng nhập email và mật khẩu", 400));
  }

    // Tìm kiếm người dùng trong cơ sở dữ liệu bằng email
  const user = await User.findOne({email}).select("+password");

    // Kiểm tra xem người dùng có tồn tại không
  if(!user){
    return next(new ErrorHandler("email hoặc mật khẩu không đúng", 401));
  }

    // So sánh mật khẩu đã nhập với mật khẩu trong cơ sở dữ liệu
  const isPassWordMatched = await user.comparePassword(password)

    // Kiểm tra xem mật khẩu có khớp không
  if(!isPassWordMatched){
    return next(new ErrorHandler("username hoặc mật khẩu không đúng", 401));
  }

    // Gửi mã thông báo (token) nếu đăng nhập thành công
  sendToken(user, 201, res);
});


// Logout user   =>  /api/v1/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  // Xóa cookie "token" bằng cách đặt giá trị null và thiết lập ngày hết hạn là ngày hiện tại
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  // Trả về mã trạng thái 200 và thông báo đăng xuất thành công
  res.status(200).json({
    message: "Đăng Xuất",
  });
});

// Quên mật khẩu => /api/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // Tìm kiếm người dùng trong cơ sở dữ liệu bằng email
  const user = await User.findOne({ email: req.body.email });
  // Kiểm tra xem người dùng có tồn tại không
  if (!user) {
    return next(new ErrorHandler("Không tìm thấy email", 404));
  }
 
  // Tạo mã token để đặt lại mật khẩu cho người dùng
  const resetToken = user.getResetPasswordToken(); 
  // Lưu thông tin mã token vào cơ sở dữ liệu
  await user.save();

  // Tạo URL để người dùng có thể đặt lại mật khẩu
  const resetUrl = `${process.env.FRONTEND_URL}/api/password/reset/${resetToken}`;
   // Tạo nội dung email chứa liên kết đặt lại mật khẩu
  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    // Gửi email chứa liên kết đặt lại mật khẩu đến địa chỉ email của người dùng
    await sendEmail({
      email: user.email,
      subject: " FashionShop - Email lấy lại mật khẩu",
      message,
    });
    // Trả về mã trạng thái 200 và thông báo email đã được gửi thành công
    res.status(200).json({
      message: `Email từ: ${user.email}`,
    });
  } catch (error) {
    // Nếu có lỗi khi gửi email, xóa thông tin mã token và hết hạn của người dùng và trả về lỗi
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }
});