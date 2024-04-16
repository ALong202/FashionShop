import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

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

  if(!email || !password){
    return next(new ErrorHandler("Vui lòng nhập email và mật khẩu", 400));
  }

  const user = await User.findOne({email}).select("+password");

  if(!user){
    return next(new ErrorHandler("email hoặc mật khẩu không đúng", 401));
  }

  const isPassWordMatched = await user.comparePassword(password)

  if(!isPassWordMatched){
    return next(new ErrorHandler("username hoặc mật khẩu không đúng", 401));
  }

  sendToken(user, 201, res);
});


// Logout user   =>  /api/v1/logout
export const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Đăng Xuất",
  });
});


export const forgotPassword = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("Không tìm thấy email", 404));
  }
 
  
  const resetToken = user.getResetPasswordToken(); 

  await user.save();


  const resetUrl = `${process.env.FRONTEND_URL}/api/password/reset/${resetToken}`;
 
  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: " FashionShop - Email lấy lại mật khẩu",
      message,
    });

    res.status(200).json({
      message: `Email từ: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }
});