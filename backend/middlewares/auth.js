import catchAsyncErrors from "./catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Kiểm tra xem có phải thành viên
export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Vui lòng đăng nhập để tiếp tục", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

// 
export const authorizeRoles = (...roles) =>{
  return (req, res, next) =>{
    if(!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Quyền (${req.user.role}) không có thể truy cập chức năng này`,
          403
        )
      );
    }
  };

};