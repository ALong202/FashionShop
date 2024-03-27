import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
     productID: {
      type: Number,
      required: true,
      unique: true, 
    },

    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },

    price: {
      type: Number,
      required: [true, "Please enter product price"],
      min: 0,
    },

    description: {
      type: String,
      required: [true, "Please enter product description"],
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
      required: [true, "Please enter product category"],
      enum: ["Áo", "Quần", "Phụ kiện"],
      subCategory: {
        type: String,
        enum: {
          "Áo": ["Áo sơ mi", "Áo Polo", "Áo T-shirt", "Áo len"],
          "Quần": ["Quần Jeans","Quần tây"],
          "Phụ kiện": ["Cà vạt", "Thắt lưng", "Tất"],
        },
        message: "Please select correct category",
      }
    },

    color: {
      type: String,
      required: [true, "Please enter product color"],
      enum: {
        values: ["Trắng", "Đen", "Đỏ", "Xanh"],
        message: "Please select a valid color (Trắng, Đen, Đỏ, Xanh)",
      },
    },

    size: {
      type: [String],
      required: [true, "Please enter product size"],
      enum: {
        values: ["S", "M", "L","F"],
        message: "Please select a valid size (S, M, L)",
      },
    },
    

    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
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