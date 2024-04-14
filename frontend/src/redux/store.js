import { configureStore } from '@reduxjs/toolkit' // ref: https://redux-toolkit.js.org/api/configureStore
import { productApi } from './api/productsApi' // auto chèn khi chọn productAPi
import { authApi } from './api/authApi'

import cartReducer from "./features/cartSlice";
import { orderApi } from './api/orderApi';

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    // todos: todosReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer, // ref: https://redux-toolkit.js.org/rtk-query/usage#adding-the-api-to-the-store
    [orderApi.reducerPath]: orderApi.reducer,
     
  },
  // ref: https://redux-toolkit.js.org/rtk-query/usage#adding-the-api-middleware
  middleware: (getDefaultMiddleware) =>   
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware
      orderApi.middleware,
    ]),    
});

