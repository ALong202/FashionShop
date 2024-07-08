import React, { useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import { colorMap } from "../../constants/constants";
import NewReview from "../reviews/NewReview";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { clearReview, setReviewItem } from "../../redux/features/reviewSlice";

const OrderDetails = () => {
  //const { user } = useSelector((state) => state.auth);
  const { reviewItems } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  const params = useParams();
  const { data, isLoading, error, isSuccess } = useOrderDetailsQuery(
    params?.id
  );
  const order = data?.order || {};

  const { orderItems, paymentInfo, user, orderStatus } = order;

  const isPaid = paymentInfo?.status === "Đã thanh toán" ? true : false;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      dispatch(clearReview());
      // console.log(data);
      const initData = data?.order?.orderItems?.map((d) => ({
        orderItems: d,
        userID: user?._id,
        rating: 0,
        comment: "",
        orderID: data?.order?._id,
        status: data?.order?.orderStatus,
        variantID: d?.selectedVariant?.variantID,
        flag: false,
      }));

      // console.log("init data", initData);
      // console.log("od items", orderItems)

      initData.forEach((i) => {
        setItemToReview(i); // Gửi mỗi item vào action và gửi lên Redux store
      });
    }
  }, [error, isSuccess]);

  const setItemToReview = (item) => {
    const reviewItem = {
      orderItems: item?.orderItems,
      userID: item?.userID,
      rating: item?.rating,
      comment: item?.comment,
      orderID: item?.orderID,
      status: item?.status,
      variantID: item?.variantID,
      flag: item?.flag,
    };

    dispatch(setReviewItem(reviewItem));

    // console.log(reviewItem);
  };

  if (isLoading) return <Loader />;

  const openReview = (e) => {
    const flagItem = reviewItems.find((r) => r?.variantID === e);
    // console.log("e = ", e, "\nflagitem = ", flagItem)
    const { flag, ...restItem } = flagItem;
    const flagedItem = {
      ...restItem,
      flag: true,
    };
    setItemToReview(flagedItem);
  };

  return (
    <>
      <MetaData title={"Chi tiết đơn hàng"} />
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-lg-9 mt-5 order-details">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-5 mb-4">Chi tiết đơn hàng</h3>
            <Link
              to={`/invoice/orders/${order?._id}`}
              className="btn btn-success"
            >
              <i className="fa fa-print"></i>Hóa đơn
            </Link>
          </div>

          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th style={{ width: "50%" }} scope="row">
                  Mã đơn hàng
                </th>
                <td style={{ textAlign: "right" }}>
                  {order?.shippingInfo?.orderID.toUpperCase()}
                </td>
              </tr>
              <tr>
                <th scope="row">Trạng thái đơn hàng</th>
                <td
                  style={{ textAlign: "right" }}
                  className={
                    String(order?.orderStatus).includes("Deliverd")
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{orderStatus}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Ngày đặt hàng</th>
                <td style={{ textAlign: "right" }}>
                  {new Date(order?.createdAt).toLocaleString("vi-VN")}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Thông tin nhận hàng</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th style={{ width: "50%" }} scope="row">
                  Tên người nhận
                </th>
                <td style={{ textAlign: "right" }}>{user?.name}</td>
              </tr>
              <tr>
                <th scope="row">Điện thoại liên hệ</th>
                <td style={{ textAlign: "right" }}>
                  {order?.shippingInfo?.phoneNo}
                </td>
              </tr>
              <tr>
                <th scope="row">Đỉa chỉ giao hàng</th>
                <td style={{ textAlign: "right" }}>
                  {order?.shippingInfo?.address}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className="mt-5 mb-4">Thông tin thanh toán</h3>
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th style={{ width: "50%" }} scope="row">
                  Tình trạng thanh toán
                </th>
                <td
                  style={{ textAlign: "right" }}
                  className={isPaid ? "greenColor" : "redColor"}
                >
                  <b>{order?.paymentInfo?.status}</b>
                </td>
              </tr>
              <tr>
                <th scope="row">Hình thức thanh toán</th>
                <td style={{ textAlign: "right" }}>{order?.paymentMethod}</td>
              </tr>
              <tr>
                <th scope="row">Mã thanh toán trực truyến</th>
                <td style={{ textAlign: "right" }}>
                  {order?.paymentMethod === "Card"
                    ? order?.shippingInfo?.orderID
                    : "NA(COD)"}
                </td>
              </tr>
              <tr>
                <th scope="row">Tiền sản phẩm</th>
                <td style={{ textAlign: "right" }}>
                  {order &&
                    order.shippingAmount &&
                    order?.itemsPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </td>
              </tr>
              <tr>
                <th scope="row">Tiền vận chuyển</th>
                <td style={{ textAlign: "right" }}>
                  {order &&
                    order.shippingAmount &&
                    order?.shippingAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </td>
              </tr>
              <tr>
                <th scope="row">Tổng tiền thanh toán</th>
                <td style={{ textAlign: "right" }}>
                  {order &&
                    order.shippingAmount &&
                    order?.totalAmount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-5 my-4">
              <strong>Sản phẩm trong đơn hàng:</strong>
            </h3>
          </div>

          {/* <hr /> */}
          <div id="order_summary" className="cart-item my-1">
            {reviewItems?.map((item) => (
              <div className="row my-5">
                <div className="col-4 col-lg-2">
                  <img
                    src={item?.orderItems?.image}
                    alt={item?.orderItems?.name}
                    height="150"
                    width="150"
                  />
                </div>

                <div className="col-5 col-lg-5">
                  <Link to={`/product/${item?.orderItems?.product}`}>
                    {item?.orderItems?.name}
                  </Link>
                  <div>
                    <button
                      key={item?.orderItems?.selectedVariant?.color}
                      style={{
                        backgroundColor:
                          colorMap[item?.orderItems?.selectedVariant?.color],
                      }}
                      className={"color-button active"}
                      disabled={true}
                    >
                      {item?.orderItems?.selectedVariant?.color}
                    </button>
                    <button
                      key={item?.orderItems?.selectedVariant?.size}
                      className={"size-button selected"}
                      disabled={true}
                    >
                      {item?.orderItems?.selectedVariant?.size}
                    </button>
                  </div>

                  <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-bs-toggle="modal"
                    data-bs-target="#ratingModal"
                    value={item?.orderItems?.selectedVariant?.variantID}
                    onClick={(e) => {
                      openReview(e.target.value);
                    }}
                  >
                    Đánh giá sản phẩm
                  </button>
                  <NewReview />

                  {/* {item?.status === "Delivered" ? (
                    <>
                      <button
                        id="review_btn"
                        type="button"
                        className="btn btn-primary mt-4"
                        data-bs-toggle="modal"
                        data-bs-target="#ratingModal"
                        value={item?.orderItems?.selectedVariant?.variantID}
                        onClick={(e) => {
                          openReview(e.target.value);
                        }}
                      >
                        Đánh giá sản phẩm
                      </button>
                      <NewReview />
                    </>
                  ) : (
                    <button
                      id="review_btn"
                      type="button"
                      className="btn btn-primary mt-4"
                      value={item?.orderItems?.selectedVariant?.variantID}
                      disabled={true}
                    >
                      Đánh giá sản phẩm
                    </button>
                  )} */}
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>
                    {item?.orderItems?.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>
                    {item?.orderItems?.quantity} x{" "}
                    {item?.orderItems?.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                    ={" "}
                    <b>
                      {(
                        item?.orderItems?.quantity * item?.orderItems?.price
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </b>
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* <hr /> */}
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
