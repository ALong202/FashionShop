import React, { useEffect, useState } from "react";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi"; // auto chèn khi chọn useGetProductDetailsQuery
// frames hook dùng để lấy id từ params
import { useParams } from "react-router-dom"; // auto chèn khi chọn useParams
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import StarRatings from "react-star-ratings";
import { useDispatch } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";

const ProductDetails = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1); // quantity: số lượng sản phẩm
  const [activeImg, setActiveImg] = React.useState(""); // activeImg: ảnh đang được chọn
  const [selectedSize, setSelectedSize] = useState(null); // size: kích cỡ sản phẩm


  const { data, isLoading, error, isError } = useGetProductDetailsQuery(params?.id);

  const product = data?.product;


  useEffect(() => {
    setActiveImg(product?.images[0] ? product?.images[0]?.url : "/images/default_product.png");
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  // Chọn size
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  
  const increseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product?.stock)
      return;
    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1)
      return;
    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      size: selectedSize, // size: kích cỡ sản phẩm
      quantity
    };

    dispatch(setCartItem(cartItem));
    toast.success("Đã thêm vào giỏ");

    console.log(cartItem);
  };

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
            style={{ objectFit: 'contain', maxHeigth: "0%"}}
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
          <span className="btn btn-danger minus" onClick={decreseQty}>-</span>
          <input
            type="number"
            className="form-control count d-inline"
            value={quantity}
            readonly
          />
          <span className="btn btn-primary plus" onClick={increseQty}>+</span>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={product.stock <= 0}
          onClick={setItemToCart}
        >
          Thêm vào giỏ
        </button>

        <hr />

        <p>
          Tình trạng: <span id="stock_status" className={product?.stock > 0 ? "greenColor" : "redColor"}>{product?.stock > 0 ? "Còn hàng" : "Hết hàng"}</span>
        </p>

        <p>Sizes: </p>
        <div className="size-buttons">
          {product.size.map((size, index) => (
            <button 
              key={index} 
              onClick={() => handleSizeClick(size)}
              // Cập nhật trạng thái khi size button được nhấn, sau đó thêm class selected vào button khi render lại component
              className={`size-button ${selectedSize === size ? 'selected' : ''}`}
              disabled={product.stock <= 0}  // Disable the button if there's no stock for this size
            >
              {size}
            </button>
          ))}
        </div>

        <hr />

        <h4 className="mt-2">Mô tả:</h4>
        <p>
          {product?.description}
        </p>
        <hr />
        <p id="product_seller mb-3">Sản xuất bởi: <strong>FashionShop</strong></p>

        <div className="alert alert-danger my-5" type="alert">
          Hãy đăng nhập để xem đánh giá.
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

/*
"border-warning": class dùng để border màu vàng cho ảnh đang được chọn
*/