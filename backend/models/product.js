import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
     productID: {
      type: String,
      required: true,
      unique: true, 
    },

    name: {
      type: String,
      required: [true, "Vui lòng nhập tên sản phẩm."],
      maxLength: [200, "Tên sản phẩm không được vượt quá 200 ký tự."],
    },

    price: {
      type: Number,
      required: [true, "Vui lòng nhập giá sản phẩm."],
      min: 0,
    },

    description: {
      type: String,
      required: [true, "Vui lòng nhập mô tả sản phẩm."],
    },

    ratings: {
      type: Number,
      min:0,
      max:5,
    },

    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      required: [true, "Vui lòng nhập danh mục sản phẩm"],
      enum: ["Nữ", "Nam"],
      subCategory: {
          type: String,
          enum: {
              "Nữ": ["Áo khoác", "Áo len","Áo phông", "Áo sơ mi","Chân váy "," Đầm","Quần bò","Quần short"],
              "Nam": ["Áo khoác", "Áo len","Áo phông", "Áo sơ mi","Quần bò","Quần short","Quần tây","Phụ kiện"],
          },
          message: "Vui lòng chọn danh mục con",
      }
  },

    color: {
      type: String,
      required: [true, "Vui lòng nhập màu sản phẩm."],
      enum: {
        values: ["Trắng", "Đen", "Đỏ", "Xanh","Vàng","Hồng","Cam","Xám"],
        message: "Vui lòng chọn một màu hợp lệ (Trắng, Đen, Đỏ, Xanh, Vàng)",
      },
    },

    size: {
      type: [String],
      required: [true, "Vui lòng nhập kích cỡ sản phẩm"],
      enum: {
        values: ["S", "M", "L","F"],
        message: "Vui lòng chọn một size hợp lệ (S, M, L)",
      },
    },
    

    stock: {
      type: Number,
      required: [true, "Vui lòng nhập lượng tồn kho sản phẩm"],
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          // ref: "User", // Chỉ active khi project go-live
          // required: true,
        },
        rating: {
          type: Number,
          min:1,
          max:5,
        },
        comment: {
          type: String,
        },
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      // ref: "User", // Chỉ active khi project go-live
      // required: true,
    },
  },
  
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);