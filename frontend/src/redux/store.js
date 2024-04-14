import { configureStore } from '@reduxjs/toolkit' // ref: https://redux-toolkit.js.org/api/configureStore
import { productApi } from './api/productsApi' // auto chèn khi chọn productAPi
import { authApi } from './api/authApi'

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    // todos: todosReducer,
    [productApi.reducerPath]: productApi.reducer, // ref: https://redux-toolkit.js.org/rtk-query/usage#adding-the-api-to-the-store
    [authApi.reducerPath]: authApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, authApi.middleware), // ref: https://redux-toolkit.js.org/rtk-query/usage#adding-the-api-middleware
})

