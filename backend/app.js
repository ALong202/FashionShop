// File nhập liệu chính của backend
import express from "express";

// Tạo 1 dối tượng ứng dụng Express mới
const app = express();

// Một thư viện của JavaScript load các biến môi trường từ tập tin '.env' vào application's runtime environment
import dotenv from "dotenv";

import { connectDatabase } from "./config/dbConnect.js"; // tự hiện khi gõ lệnh connectDatabase()
import errorsMiddleware from "./middlewares/errors.js";



dotenv.config({ path: "backend/config/config.env" });

// Connect với database
connectDatabase();

// Import tất cả các routes (đường dẫn)
import productRoutes from "./routes/products.js";

app.use("/api", productRoutes);

app.use(errorsMiddleware);

// app instance đăng ký routes và listen ở port 3000.
app.listen(process.env.PORT, () => {
  console.log(
    `Server đang chạy ở port ${process.env.PORT} ở chế độ ${process.env.NODE_ENV}`
  );
});
