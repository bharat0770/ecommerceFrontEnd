import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`
    }),
    tagTypes: ["order"],
    endpoints: (builder) => ({
        newOrder: builder.mutation({
            query: (order) => ({
                url: "new",
                method: "POST",
                body: order,
            }),
            invalidatesTags: ["order"]
        }),
        updateOrder: builder.mutation({
            // query: ({ userId, orderId }) => ({
            query: (orderId) => ({
                url: `/id?id=${orderId}`,
                method: "PUT",
            }),
            invalidatesTags: ["order"]
        }),
        deleteOrder: builder.mutation({
            // query: ({ userId, orderId }) => ({
            query: (orderId) => ({
                url: `/id?id=${orderId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["order"]
        }),
        myOrder: builder.query({
            query: (id) => (`my/?id=${id}`), // here id will be user id
        }),
        allOrder: builder.query({
            query: (email) => (`all/?email=${email}`), // here id wil be admin id
            providesTags: ["order"]
        }),
        orderDetails: builder.query({
            query: (id) => (`id/?id=${id}`), // here id will be oder id 
        }),
    })
});
export const { useNewOrderMutation, useAllOrderQuery, useMyOrderQuery, useOrderDetailsQuery, useUpdateOrderMutation, useDeleteOrderMutation } = orderApi;
