/* 
ref https://redux-toolkit.js.org/rtk-query/overview
RTK Query is a data fetching and caching tool built on top of Redux Toolkit.
*/ 
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  // builder to access the query function, mutations, send requests
  // endpoints lấy sản phẩm từ backend
  endpoints: (builder) => ({ 
    getProducts: builder.query({
      query: (params) => ({
        url: "/products",
      }),
      
    }),
    // getProductById: builder.query({
    //   query: (id) => `/${id}`,
    // }),
  }),
})

// the hook  để lấy toàn bộ sản phẩm, tất cả biến Isloading-sucess-error variables
export const { useGetProductsQuery } = productApi;