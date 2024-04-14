import React, { useEffect } from "react";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi"; // auto chèn khi chọn useGetProductDetailsQuery
// frames hook dùng để lấy id từ params
import { useParams } from "react-router-dom"; // auto chèn khi chọn useParams
import toast from "react-hot-toast";
import Loader from "../layout/Loader";
import StarRatings from "react-star-ratings";

const ProductDetails = () => {
  const params = useParams();
  const { data, isLoading, error, isError } = useGetProductDetailsQuery(params?.id);
  const product = data?.product;

  const [activeImg, setActiveImg] = React.useState("");

  useEffect(() => {
    setActiveImg(product?.images[0] ? product?.images[0]?.url : "/images/default_product.png");
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  if (isLoading) return <Loader />


  return (
    <div className="row d-flex justify-content-around">
      <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activeImg}
            alt={product?.name}
            width="340"
            height="390"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {product?.images?.map((img) => (
            <div className="col-2 ms-4 mt-2">
              <a role="button">
                <img
                  className={`d-block border rounded p-3 cursor-pointer ${img.url === activeImg ? "border-warning" : ""}`}
                  height="100"
                  width="100"
                  src={img?.url}
                  alt={img?.url}
                  onClick={(e) => setActiveImg(img.url)}
                />
              </a>
            </div>
          ))}
          
        </div>
      </div>

      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">SKU # {product?.productID}</p>

        <hr />

        <div className="d-flex">
          <StarRatings
              rating={product?.ratings}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name='rating'
              starDimension="1.4em"
              starSpacing="1px"
          />
          <span id="no-of-reviews" className="pt-1 ps-2"> ({product?.numOfReviews} Đánh giá) </span>
        </div>
        <hr />

        <p id="product_price">{product?.price.toLocaleString("vi-VN")}đ</p>
        <div className="stockCounter d-inline">
          <span className="btn btn-danger minus">-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value="1"
            readonly
          />
          <span className="btn btn-primary plus">+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled=""
        >
          Thêm vào giỏ
        </button>

        <hr />

        <p>
          Tình trạng: <span id="stock_status" className={product?.stock > 0 ? "greenColor" : "redColor"}>{product?.stock > 0 ? "Còn hàng" : "Hết hàng"}</span>
        </p>

        <hr />

        <h4 className="mt-2">Mô tả:</h4>
        <p>
          {product?.description}
        </p>
        <hr />
        <p id="product_seller mb-3">Được bán bởi: <strong>FashionShop</strong></p>

        <div className="alert alert-danger my-5" type="alert">
          Login to post your review.
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

/*
"border-warning": class dùng để border màu vàng cho ảnh đang được chọn
*/