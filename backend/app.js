// File nhập liệu chính của backend
import express from 'express';

// Tạo 1 dối tượng ứng dụng Express mới
const app = express();

// Một thư viện của JavaScript load các biến môi trường từ tập tin '.env' vào application's runtime environment
import dotenv from 'dotenv';

dotenv.config({ path: "backend/config/config.env" });

// Import tất cả các routes (đường dẫn)
import productRoutes from './routes/products.js'

app.use("/api", productRoutes)

// app instance đăng ký routes và listen ở port 3000.
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} in mode ${process.env.NODE_ENV}`);
});