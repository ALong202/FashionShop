import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";
import AdminLayout from "../layout/AdminLayout";
import { colorMap } from "../../constants/constants";

//PENDING: cập nhật trạng thái thanh toán của đơn COD-> từ đó cập nhật trạng thái giao hàng của đơn
const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const params = useParams();

  const { data } = useOrderDetailsQuery(params?.id);

  const order = data?.order || {};

  const [updateOrder, { error, isSuccess }] = useUpdateOrderMutation();

  const { orderItems, paymentInfo } = order;

  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  // console.log(orderStatus)

  //const { orderItems, orderStatus} = order;

  //const [orderStatus, setOrderStatus] = useState(x);

  //console.log("od stt", orderStatus)

  //const [paymentStatus, setPaymentStatus] = useState(data?.order?.paymentInfo?.status);
  //console.log(paymentStatus)
  //const isPaid = order?.paymentInfo?.status === "Đã thanh toán" ? true : false;

  useEffect(() => {
    if (order) setOrderStatus(order.orderStatus);
  }, [order]);

  useEffect(() => {
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (paymentInfo) setPaymentStatus(paymentInfo?.status);
  }, [paymentInfo]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      setOrderStatus(status);
      if (status === "Delivered") setPaymentStatus("Đã thanh toán");
      toast.success("Cập nhật đơn hàng thành công");
    }
  }, [error, isSuccess]);

  const updateOrderHandler = (id) => {
    const preSt = status;
    const dataUpdate = { status };
    //updateOrder({id, body: dataUpdate})
    updateOrder({ id, body: dataUpdate }).then(() => {
      //setOrderStatus(preSt);
      // if (status === "Delivered")
      //   setPaymentStatus("Đã thanh toán")
      //   //setPaymentStatus(data?.order?.paymentInfo?.status);
    });
  };

  return (
    <AdminLayout>
      <MetaData title={"Chi tiết đơn hàng"} />
      <div className="row d-flex justify-content-around">
        <div className="col-12 col-lg-8 order-details">
          <h3 className="mt-5 mb-4">Chi tiết đơn hàng</h3>
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
                {/* className="greenColor" */}
                <td
                  style={{ textAlign: "right" }}
                  className={
                    orderStatus === "Delivered"
                      ? "greenColor"
                      : orderStatus === "Shipped"
                      ? "yellowColor"
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
                <td style={{ textAlign: "right" }}>{order?.user?.name}</td>
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
                  className={
                    paymentStatus === "Đã thanh toán"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  <b>{paymentStatus}</b>
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
                    ? order?.shippingInfo?.orderID.toUpperCase()
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

          {/* <hr /> */}
          <h3 className="mt-5 my-4">
            <strong>Sản phẩm trong đơn hàng:</strong>
          
          </h3>
          <div id="order_summary" className="cart-item my-1">
            {order?.orderItems?.map((item) => (
              <div className="row my-5">
                <div className="col-4 col-lg-2">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    height="100"
                    width="100"
                  />
                </div>

                <div className="col-5 col-lg-5">
                  <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                  <div>
                    <button
                      key={item?.selectedVariant?.color}
                      style={{
                        backgroundColor: colorMap[item?.selectedVariant?.color],
                      }}
                      className={"color-button active"}
                      disabled={true}
                    >
                      {item?.selectedVariant?.color}
                    </button>
                    <button
                      key={item?.selectedVariant?.size}
                      className={"size-button selected"}
                      disabled={true}
                    >
                      {item?.selectedVariant?.size}
                    </button>
                  </div>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p>
                    {item?.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <p>
                    {item?.quantity} x{" "}
                    {item?.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                    ={" "}
                    <b>
                      {(item?.quantity * item?.price).toLocaleString("vi-VN", {
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

        <div className="col-12 col-lg-3 mt-5">
          <h4 className="my-4">Trạng thái đơn hàng</h4>

          <div className="mb-3">
            <select
              className="form-select"
              name="status"
              value={status}
              disabled={orderStatus === "Delivered"}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <button
            className="btn btn-primary w-100"
            disabled={orderStatus === "Delivered"}
            onClick={() => updateOrderHandler(order?._id)}
          >
            Cập nhật đơn hàng
          </button>

          <h4 className="mt-5 mb-3">Hóa đơn bán hàng</h4>
          <Link
            to={`/invoice/orders/${order?._id}`}
            className="btn btn-success w-100 "
          >
            <i className="fa fa-print"></i> Xem và in Hóa đơn
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;
