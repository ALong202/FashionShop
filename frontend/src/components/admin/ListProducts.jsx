import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDeleteProductMutation, useGetAdminProductsQuery } from "../../redux/api/productsApi";
import AdminLayout from "../layout/AdminLayout";

const ListProducts = () => {
  const { data, isLoading, error } = useGetAdminProductsQuery();

  const [deleteProduct, { isLoading: isDeleteLoading, error: deleteError, isSuccess }] = useDeleteProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Xóa sản phẩm thành công");
    }
  }, [error, deleteError, isSuccess]);

  const deleteProductHandler = (id) => {
    deleteProduct(id);
  }

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: "Mã sản phẩm",
          field: "id",
          sort: "asc",
        },
        {
          label: "Tên sản phẩm",
          field: "name",
          sort: "asc",
        },
        {
          label: "Tồn kho",
          field: "variantStock",
          sort: "asc",
        },
        {
          label: "Hành động",
          field: "actions",
          sort: "asc",
        },
      ],

      rows: [],
    };

    data?.products?.forEach((product) => {
      // const variantDescriptions = product.variants.map(variant =>
      //   `${variant.color} / ${variant.size}: ${variant.stock}`
      // ).join(",");
      const variantDescriptions = product.variants.map((variant, index) => (
        <React.Fragment key={index}>
          {`${variant.color} / ${variant.size}: ${variant.stock}`}
          <br />
        </React.Fragment>
      ));


      products.rows.push({
        id: product?.productID, // product?._id,
        name: `${product?.name}`, // rút gọn tên với `${product?.name?.substring(0,20)}...`
        // stock: product?.stock,
        variantStock: variantDescriptions,
        actions: (
          <>
            <Link
              to={`/admin/products/${product?._id}`}
              className="btn btn-outline-primary"
              title="Chỉnh sửa sản phẩm"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/products/${product?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
              title="Cập nhật hình ảnh sản phẩm"
            >
              <i className="fa fa-image"></i>
            </Link>
            <button
              to={`/invoice/orders/${product?._id}`}
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteProductHandler(product?._id)}
              disabled={isDeleteLoading}
              title="Xoá sản phẩm"
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return products;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"Danh sách sản phẩm"} />

      <div style={{ width: "100%", margin: "auto", overflowX: "auto" }}>
        <div style={{ width: "1000px", margin: "auto", overflowX: "auto" }}> 
          <div>
            <h1 class="my-5">{data?.products?.length} Sản phẩm</h1>
          </div>

          <MDBDataTable
            data={setProducts()}
            infoLabel={["Hiển thị", "đến", "của", "sản phẩm"]}
            searchLabel="Tìm kiếm"
            paginationLabel={["Trước", "Sau"]}
            entriesLabel="Số sản phẩm mỗi trang"
            noRecordsFoundLabel="Không tìm thấy sản phẩm nào"
            noDatalabel="Không có sản phẩm nào"
            className="px-3 product-list-table"
            bordered
            striped
            hover
            noBottomColumns
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListProducts;
