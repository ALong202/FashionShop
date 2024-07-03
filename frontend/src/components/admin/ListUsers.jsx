import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useGetAdminUsersQuery } from "../../redux/api/userApi";
// import 'ag-grid-community/styles/ag-grid.css'; // Core styles
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme
import { AgGridReact } from 'ag-grid-react';
import { AG_GRID_LOCALE_VN } from '@ag-grid-community/locale';

const ListUsers = () => {
  const { data, isLoading, error } = useGetAdminUsersQuery();
  const [quickFilterText, setQuickFilterText] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    // if (deleteError) {
    //   toast.error(deleteError?.data?.message);
    // }

    // if (isSuccess) {
    //   toast.success("Order Deleted");
    // }
  }, [error]);

  // const deleteOrderHandler = (id) => {
  //   deleteOrder(id);
  // };

  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true, resizable: true },
    { headerName: "Họ tên", field: "name", sortable: true, filter: true, resizable: true },
    { headerName: "Email", field: "email", sortable: true, filter: true, resizable: true },
    { headerName: "SĐT", field: "phone", sortable: true, filter: true, resizable: true },
    { headerName: "Địa chỉ", field: "address", sortable: true, filter: true, resizable: true },
    { headerName: "Quyền", field: "role", sortable: true, filter: true, resizable: true },
    {
      headerName: "Hành động",
      field: "actions",
      cellRenderer: (params) => (
        <>
          <Link to={`/admin/orders/${params.data.id}`} className="btn btn-outline-primary button-outline">
            <i className="fa fa-pencil"></i>
          </Link>
          <button className="btn btn-outline-danger ms-2 button-outline">
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
      resizable: true
    },
  ];

  const rowData = data?.users?.map(user => ({
    id: user?._id,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    role: user?.role,
  }));


  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"All Users"} />

      <h1 className="my-5">{data?.users?.length} Tài khoản User</h1>

      {/* <MDBDataTable
        data={setUsers()}
        infoLabel={["Hiển thị", "đến", "của", "user"]}
        searchLabel="Tìm kiếm"
        paginationLabel={["Trước", "Sau"]}
        entriesLabel="Số user mỗi trang"
        noRecordsFoundLabel="Không tìm thấy user nào"
        noDatalabel="Không có user nào"
        className="px-3 user-list-table"
        bordered
        striped
        hover
      /> */}
      <input
        type="text"
        placeholder="Tìm kiếm..."
        onChange={(e) => setQuickFilterText(e.target.value)}
        style={{ marginBottom: '10px'}}
      />

      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          getRowStyle={params => {
            return { backgroundColor: params.node.rowIndex % 2 === 0 ? '#f5f5f5' : '#ffffff' };
          }} // Hàng chẵn có màu này, hàng lẻ có màu kia
          domLayout='autoHeight'
          defaultColDef={{
            flex: 1,
            minWidth: 100,
          }}
          pagination={true}
          paginationPageSize={10}
          localeText={AG_GRID_LOCALE_VN}
          quickFilterText={quickFilterText}
          // localeText={{
          //   noRowsToShow: 'Không tìm thấy user nào',
          //   page: 'Trang',
          //   of: 'của',
          //   to: 'đến',
          //   pageSize: 'Số user mỗi trang',
          //   rowsPerPage: 'Số user mỗi trang',
          //   firstPage: 'Trang Đầu',
          //   previousPage: 'Trang Trước',
          //   nextPage: 'Trang Kế',
          //   lastPage: 'Trang Cuối',
          // }}
        />
      </div>

    </AdminLayout>
  );
};

export default ListUsers;
