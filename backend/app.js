// File nhập liệu chính của backend
import express from 'express';
const app = express(); 
import dotenv from 'dotenv';

// Một thư viện của JavaScript load các biến môi trường từ tập tin '.env' vào application's runtime environment
dotenv.config({ path: "backend/config/config.env" });

// app instance đăng ký routes và nghe ở port 3000.
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});