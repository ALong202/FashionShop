/* 
*/ 
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setUser } from '../features/userSlice';

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
      // function to manipulate the response data by a query or mutation
      transformResponse: (result) => result.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
        } catch (error) {
          console.error("Failed to fetch user data: ", error);
        }
      },
    }),    

  }),
})

export const { useGetMeQuery } = userApi;