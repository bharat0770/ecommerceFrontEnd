import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allOrderResponse, MessageResponse, newOrderRequest, singleOrderResponse,  } from "../../types/api-types";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`
    }),
    tagTypes : ["order"], 
    endpoints: (builder) => ({
        newOrder: builder.mutation<MessageResponse, newOrderRequest>({
            query: (order) => ({
                url: "new",
                method: "POST",
                body: order,
            }), 
            invalidatesTags : ["order"]
        }),
        updateOrder: builder.mutation<singleOrderResponse, string>({
            // query: ({ userId, orderId }) => ({
                query: (orderId) => ({
                    url: `/id?id=${orderId}`,
                    method: "PUT",
                }), 
                invalidatesTags : ["order"]
            }),
            deleteOrder: builder.mutation<singleOrderResponse, string>({
                // query: ({ userId, orderId }) => ({
                    query: (orderId) => ({
                        url: `/id?id=${orderId}`,
                        method: "DELETE",
                    }), 
                    invalidatesTags : ["order"]
                }),
                myOrder: builder.query<allOrderResponse, string>({
                    query: (id) => (`my/?id=${id}`), // here id will be user id
                    
                }),
                allOrder: builder.query<allOrderResponse, string>({
                    query: (email) => (`all/?email=${email}`), // here id wil be admin id
                    providesTags : ["order"]
                }),
                orderDetails: builder.query<singleOrderResponse, string>({
                    query: (id) => (`id/?id=${id}`), // here id will be oder id 

        }),
    })
})
export const {
    useNewOrderMutation,
    useAllOrderQuery,
    useMyOrderQuery,
    useOrderDetailsQuery,
    useUpdateOrderMutation, 
    useDeleteOrderMutation
} = orderApi;

