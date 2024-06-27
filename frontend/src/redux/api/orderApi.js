/* 
ref https://redux-toolkit.js.org/rtk-query/overview
RTK Query is a data fetching and caching tool built on top of Redux Toolkit.
*/
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          //cần hoàn thành routes/order.js và middlewares/auth.js
          url: "/orders/new",
          method: "POST",
          body,
        };
      },
    }),
    myOrders: builder.query({
      query: () => ({
        url: `/me/orders`,
      }),
    }),
    orderDetails: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
    }),
    getDashboardSales: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/admin/getSales/?startDate=${startDate}&endDate=${endDate}`,
      }),
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useMyOrdersQuery,
  useOrderDetailsQuery,
  useLazyGetDashboardSalesQuery, // lazy: chỉ fetch data khi cần thiết
} = orderApi;
