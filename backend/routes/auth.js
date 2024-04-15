
import express from "express";
import {loginUser, registerUser } from "../controllers/authControllers.js";
const router = express.Router();

// Router route(dẫn) đến mục "/products" để get (nhận request) và đưa vào controller function (hàm điều khiển)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
export default router;

