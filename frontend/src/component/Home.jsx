import React, { useEffect } from "react"
import MetaData from "./layout/MetaData"
import { useGetProductsQuery } from "../redux/api/productsApi" // auto chèn khi chọn useGetProductsQuery
import ProductItem from "./product/ProductItem.jsx";
import Loader from "./layout/Loader.jsx"; // auto chèn khi chọn Loader
import toast from "react-hot-toast"

const Home = () => {
  const { data, isLoading, error, isError } = useGetProductsQuery();

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);
  // console.log(data, isLoading);

  if (isLoading) return <Loader />

  return (
      <>
      <MetaData title={"Cửa hàng thời trang"} />
      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">Sản phẩm nổi bật</h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem product = {product} />
              )) }
              

            </div>
          </section>
        </div>
      </div>
      </>
  )
}

export default Home