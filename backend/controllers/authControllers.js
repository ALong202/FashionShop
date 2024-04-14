import catchAsyncErrors from "../middlewares/catchAsyncErrors.js"
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

// Hàm xử lý yêu cầu đăng ký người dùng
//Register User => /api/register
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

  sendToken(user, 201, res)
});


//Login User => /api/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  // Trích xuất thông tin người dùng từ req.body sử dụng destructuring
  const {email, password} = req.body;

  if(!email || !password){
    return next(new ErrorHandler("Vui lòng nhập email và mật khẩu", 400))
  }

  const user = await User.findOne({email}).select("+password")

  if(!user){
    return next(new ErrorHandler("email hoặc mật khẩu không đúng", 401))
  }

  const isPassWordMatched = await user.comparePassword(password)

  if(!isPassWordMatched){
    return next(new ErrorHandler("username hoặc mật khẩu không đúng", 401))
  }

  sendToken(user, 201, res)
});
