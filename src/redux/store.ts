import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/product";
import { userApi } from "./api/user";
import userReducer from "./reducer/userReducer";
import cartReducer from "./reducer/cartReducer";
import { orderApi } from "./api/order";
import dashboardApi from "./api/dashboard";

export const store = configureStore({
    reducer  :{
        [userApi.reducerPath] : userApi.reducer,
        [productApi.reducerPath] : productApi.reducer,
        [orderApi.reducerPath] : orderApi.reducer, 
        [dashboardApi.reducerPath] : dashboardApi.reducer,
        [userReducer.name] : userReducer.reducer, 
        [cartReducer.name] : cartReducer.reducer, 
    }, 
    // mid() returns  an array of default middlewares and we are  adding userApi's middleware in the  list
    middleware: (mid) => mid().concat(userApi.middleware, productApi.middleware, orderApi.middleware, dashboardApi.middleware),
}); 


