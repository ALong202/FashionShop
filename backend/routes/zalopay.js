import express from "express";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
import {
  newPayment,
  newOrderWithCard,
} from "../controllers/zalopayController.js";
const router = express.Router();
// Định nghĩa các route cho zalopay process
router.route("/payment").post(newPayment);
router.route("/callback").post(newOrderWithCard);

export default router; 