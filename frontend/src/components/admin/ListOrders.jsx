import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from "../../redux/api/orderApi";
import AdminLayout from "../layout/AdminLayout";

const ListOrders = () => {
  const { data, isLoading, error } = useGetAdminOrdersQuery();

  const [
    deleteOrder,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteOrderMutation();

  useEffect(() => {
    if (error) toast.error(error?.data?.message);

    if (deleteError) toast.error(deleteError?.data?.message);

    if (isSuccess) toast.success("Đơn hàng đã bị xóa ");
  }, [error, deleteError, isSuccess]);

  const deleteOrderHandler = (id) => {
    console.log(id);
    deleteOrder(id);
  };

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "Mã đơn hàng",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tình trạng thanh toán",
          field: "paymentStatus",
          sort: "asc",
          width: 150,
        },
        {
          label: "Trạng thái đơn hàng",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Xem chi tiết",
          field: "actions",
          sort: "asc",
          width: 180,
        },
      ],

      rows: [],
    };

    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?.shippingInfo?.orderID.toUpperCase(),
        paymentStatus: `${order?.paymentInfo?.status}`,
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <Link
              to={`/admin/orders/${order?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteOrderHandler(order?._id)}
              disable={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"Danh sách đơn hàng"} />

      <div style={{ width: "100%", margin: "auto", overflowX: "auto" }}>
        <div style={{ width: "80%", margin: "auto", overflowX: "auto" }}>
          <div>
            <h1 class="my-5">{data?.orders?.length} Đơn hàng</h1>
          </div>

          <MDBDataTable
            data={setOrders()}
            infoLabel={["Hiển thị", "đến", "của", "đơn hàng"]}
            searchLabel="Tìm kiếm"
            paginationLabel={["Trước", "Sau"]}
            entriesLabel="Số đơn hàng mỗi trang"
            noRecordsFoundLabel="Không tìm thấy đơn hàng nào"
            noDatalabel="Không có đơn hàng nào"
            className="px-3"
            bordered
            striped
            hover
            noBottomColumns
            style={{ textAlign: "center" }}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListOrders;
