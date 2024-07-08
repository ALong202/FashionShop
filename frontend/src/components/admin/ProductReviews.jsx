import React, { useState, useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import {
  useDeleteReviewMutation,
  useLazyGetProductReviewsQuery,
} from "../../redux/api/productsApi";

const ProductReviews = () => {
  const [productId, setProductId] = useState(
    "Nhập mã sản phẩm để tìm bình luận"
  );

  const [getProductReviews, { data, isLoading, error }] =
    useLazyGetProductReviewsQuery();

  const [
    deleteReview,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteReviewMutation();

  useEffect(() => {
    if (error) toast.error(error?.data?.message);

    if (deleteError) toast.error(deleteError?.data?.message);

    if (isSuccess) toast.success("Đã xóa bình luận");
  }, [data, deleteError, error, isSuccess]);

  const submitHandler = (e) => {
    console.log("productId la", productId);
    e.preventDefault();
    getProductReviews(productId);
    console.log("data la", data);
  };

  const deleteOrderHandler = (id) => {
    console.log("productId 2 la", productId);
    deleteReview({ productId, id });
  };

  const setReviews = () => {
    const reviews = {
      columns: [
        {
          label: "Mã đánh giá",
          field: "id",
          sort: "asc",
        },
        {
          label: "Xếp hạng",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Bình luận",
          field: "comment",
          sort: "asc",
        },
        {
          label: "Người mua",
          field: "user",
          sort: "asc",
        },
        {
          label: "Thao tác",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.reviews?.forEach((review) => {
      //console.log("vonglap", review)
      reviews.rows.push({
        id: review?._id.toUpperCase(),
        rating: review?.rating,
        comment: review?.comment,
        user: review?.user?.name,
        actions: (
          <>
            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => deleteOrderHandler(review?._id)}
              disable={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return reviews;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <div className="row justify-content-center my-5">
        <div className="col-6">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label for="productId_field" className="form-label">
                Nhập mã sản phẩm
              </label>
              <input
                type="text"
                id="productId_field"
                className="form-control"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              id="search_button"
              type="submit"
              className="btn btn-primary w-100 py-2"
            >
              TÌM KIẾM
            </button>
          </form>
        </div>
      </div>
      <MDBDataTable
        data={setReviews()}
        className="px-3"
        bordered
        striped
        hover
        style={{ textAlign: "center" }}
      />
      {/* {data?.reviews?.length > 0 ? (
      ) : (
        <p className="mt-5.text-center">Không có đánh giá nào</p>
      )} */}
    </AdminLayout>
  );
};

export default ProductReviews;
