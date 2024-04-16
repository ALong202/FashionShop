import React from "react"
// Ở product?.name nếu không dùng link, ở website khi click vào sẽ reload entire page. Ngược thì lại thì không.
import { Link } from "react-router-dom";
// package để hiển thị số sao: https://www.npmjs.com/package/react-star-ratings
import StarRatings from "react-star-ratings";

import MetaData from "../layout/MetaData"

const ProductItem = ({ product, columnSize }) => {
  return (
    <>
    <MetaData title={"Chi tiết sản phẩm"} />
    <div className={`col-sm-12 col-md-6 col-lg-${columnSize} my-3`}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={product?.images[0] ? product?.images[0]?.url : "/images/default_product.png"}
          alt="product?.name"
        />
        <div
          className="card-body ps-3 d-flex justify-content-center flex-column"
        >
          <h5 className="card-title">
            {/*<a href="">{product?.name}</a>*/}
            <Link to={`/product/${product?._id}`}>{product?.name}</Link>
          </h5>
          <div className="ratings mt-auto d-flex">
            <StarRatings
              rating={product?.ratings}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name='rating'
              starDimension="1.2em"
              starSpacing="1px"
            />
            <span id="no_of_reviews" className="pt-2 ps-2"> ({product?.numOfReviews}) </span>
          </div>
          <p className="card-text mt-2">{product?.price.toLocaleString('vi-VN')}đ</p>
          <a href={`/product/${product?._id}`} id="view_btn" className="btn btn-block">
            Chi tiết
          </a>
        </div>
      </div>
    </div>
    </>

  )
}

export default ProductItem

// .toLocaleString('vi-VN') => Chuyển đổi số sang chuỗi theo định dạng tiền tệ Việt Nam

{/*<div className="star-ratings">
  <i className="fa fa-star star-active"></i>
  <i className="fa fa-star star-active"></i>
  <i className="fa fa-star star-active"></i>
  <i className="fa fa-star star-active"></i>
  <i className="fa fa-star star-active"></i>
</div>*/}