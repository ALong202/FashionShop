/* 
*/ 
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setIsAuthenticated, setUser } from '../features/userSlice';

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User"], // tagTypes để xác định loại dữ liệu trả về
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
      providesTags: ["User"], // khi getUser gọi và thành công, sẽ cung cấp tag User
    }),
    updateProfile: builder.mutation({
      query(body) {
        return {
          url: "/me/update",
          method: "PUT",
          body,
        };      
      },
      invalidatesTags: ["User"], // khi updateProfile thành công, sẽ làm mất hiệu lực dữ liệu tag User, yêu cầu 1 lần gọi API mới để lấy dữ liệu mới nhất của người dùng sau udpate.  
    }), 
  }),
})

export const { useGetMeQuery, useUpdateProfileMutation } = userApi;