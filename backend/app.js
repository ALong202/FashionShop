import express from "express";// File nhập liệu chính của backend
const app = express();// Tạo 1 dối tượng ứng dụng Express mới
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; // Một thư viện của JavaScript load các biến môi trường từ tập tin '.env' vào application's runtime environment
import { connectDatabase } from "./config/dbConnect.js"; // tự hiện khi gõ lệnh connectDatabase()
import errorsMiddleware from "./middlewares/errors.js";
import getRawBody from 'raw-body';




process.on("uncaughtException", (err) =>{
  console.log(`ERROR: ${err}`);
  console.log("shutting down due to uncatch exception");
  process.exit(1);
})

dotenv.config({ path: "backend/config/config.env" });

// Connect với database
connectDatabase();
// mở rộng kích thước file json lên 10mb. 10mb cũng là giá trị tối đa của cloudinary. Tuy nhiên khi upload ảnh, dữ liệu sẽ moá hoá dạng base64, làm tăng kích thước dữ liệu lên server lên đến 33%. nên phải tăng json request limit lên. 1 cách để sử dụng khác là dùng thư viện multer
app.use(express.json({ limit: "20mb" })); 

app.use(cookieParser());

// Import tất cả các routes (đường dẫn)
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";

app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", orderRoutes);

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
  

// const upload = multer({ 
//   limits: { 
//     fileSize: 10 * 1024 * 1024, // 10MB
//   },
// });

// app.post('/upload', upload.single('file'), (req, res) => {
//   // req.file chứa thông tin về tệp đã tải lên
//   res.send('File uploaded successfully');
// });