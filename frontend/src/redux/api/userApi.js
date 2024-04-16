/* 
*/ 
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),

    // endpoints để gửi request đến backend
  endpoints: (builder) => ({ 
    getMe: builder.query({
      query: () => {
        return{
          url: '/me',
        }
      },
    }),    

  }),
})

export const { useGetMeQuery } = userApi;