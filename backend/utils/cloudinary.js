import cloudinary from "cloudinary";
import dotenv from "dotenv";
import fs from 'fs';
// Đường dẫn tới file cấu hình local
const localConfigPath = "backend/config/config.env.local";
const globalConfigPath = "backend/config/config.env.global";

// Chỉ sử dụng config.env ở Development
if (process.env.NODE_ENV !== "PRODUCTION") {
  // Kiểm tra sự tồn tại của file cấu hình local -> ưu tiên sử dụng
  if (fs.existsSync(localConfigPath)) {
    console.log(localConfigPath);
    dotenv.config({ path: localConfigPath }); // cho phép ghi đè các biến môi trường đã tồn tại
  } else if (fs.existsSync(globalConfigPath)) {
    dotenv.config({ path: globalConfigPath });
  } else {
    console.log("backend/config/config.env");
    dotenv.config({ path: "backend/config/config.env" });
  }
} else {
  dotenv.config({ path: ".env.production" });
}
console.log(process.env.CLOUDINARY_CLOUD_NAME)

// dotenv.config({ path: "backend/config/config.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const upload_file = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          public_id: result.public_id,
          url: result.url,
        });
      },
      {
        resource_type: "auto",
        folder,
      }
    );
  });
}

export const delete_file = async(file) => {
  const res = await cloudinary.uploader.destroy(file)

  if(res?.result === "ok") return true;
}