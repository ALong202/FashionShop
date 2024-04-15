import express from "express";// File nhập liệu chính của backend
const app = express();// Tạo 1 dối tượng ứng dụng Express mới
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; // Một thư viện của JavaScript load các biến môi trường từ tập tin '.env' vào application's runtime environment
import { connectDatabase } from "./config/dbConnect.js"; // tự hiện khi gõ lệnh connectDatabase()
import errorsMiddleware from "./middlewares/errors.js";

process.on("uncaughtException", (err) =>{
  console.log(`ERROR: ${err}`);
  console.log("shutting down due to uncatch exception");
  process.exit(1);
})

dotenv.config({ path: "backend/config/config.env" });

// Connect với database
connectDatabase();
app.use(express.json());
app.use(cookieParser());

// Import tất cả các routes (đường dẫn)
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";

app.use("/api", productRoutes);
app.use("/api", authRoutes);


app.use(errorsMiddleware);

// app instance đăng ký routes và listen ở port 3000.
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server đang chạy ở port ${process.env.PORT} ở chế độ ${process.env.NODE_ENV}`
  );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
  