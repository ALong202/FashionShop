
import express from "express";
import {
  resetPassword, 
  forgotPassword, 
  logout, 
  loginUser, 
  registerUser 
} from "../controllers/authControllers.js";
const router = express.Router();

// Router route(dẫn) đến mục "/products" để get (nhận request) và đưa vào controller function (hàm điều khiển)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
export default router;

