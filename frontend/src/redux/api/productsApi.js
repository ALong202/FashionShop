/* 
ref https://redux-toolkit.js.org/rtk-query/overview
RTK Query is a data fetching and caching tool built on top of Redux Toolkit.
*/ 
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  // giữ data trong cache 1 ngày: https://redux-toolkit.js.org/rtk-query/usage/cache-behavior
  keepUnusedDataFor: 86400,
  // builder to access the query function, mutations, send requests
  // endpoints lấy sản phẩm từ backend
  endpoints: (builder) => ({ 
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
        // đưa params về backend 
        // params: {
        //   page: params?.page,
        // }
      }),
    }),
    // Lấy thông tin chi tiết sản phẩm từ backend
    getProductDetails: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
    }),
    // getProductById: builder.query({
    //   query: (id) => `/${id}`,
    // }),
  }),
})

// the hook  để lấy toàn bộ sản phẩm, tất cả biến Isloading-sucess-error variables
export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;