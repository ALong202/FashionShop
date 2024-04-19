import React, { useEffect } from 'react'
import { useMyOrdersQuery } from '../../redux/api/orderApi'
import { toast } from 'react-toastify';
import Loader from '../layout/Loader';
import { MDBDataTable } from 'mdbreact';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/features/cartSlice';

const MyOrder = () => {
  const { data, isLoading, error } = useMyOrdersQuery();

  const [searchParams] = useSearchParams();

  const orderSuccess = searchParams.get("order_success");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message);
    }

    if (orderSuccess){
      dispatch(clearCart);
      navigate("/me/orders")
    }
  }, [error, orderSuccess]);

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "Mã đơn hàng",
          field: "id",
          sort:  "asc",
        },
        {
          label: "Tổng tiền thanh toán",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Tình trạng thanh toán",
          field: "paymentStatus",
          sort: "asc",
        },
        {
          label: "Trạng thái đơn hàng",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],

      rows: [],
    }

    data?.orders?.forEach((order) => {
      orders.rows.push({
        //id: order?.shippingInfo?.orderID?.toUpperCase(),
        id: order?._id,
        amount: order?.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
        <>
          <Link to = {`/me/orders/${order?._id}`} className = "btn btn-primary">
            <i className = "fa fa-eye" ></i>
          </Link>
          {/*<Link to = {`invoice/order/${order?.shippingInfo?.orderID}`} className = "btn btn-success ms-2">*/}
          <Link to = {`/invoice/orders/${order?._id}`} className = "btn btn-success ms-2">
            <i className = "fa fa-print" ></i>
          </Link>
        </>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <Loader />

  return (
    <div>
      <MetaData title = {"Danh sách đơn hàng"} />

      <h1 class="my-5">{data?.orders?.length} Đơn hàng</h1>

      <MDBDataTable 
        data = {setOrders()}
        className = "px-3"
        bordered
        striped
        hover
      />
        


    </div>
  )
}

export default MyOrder