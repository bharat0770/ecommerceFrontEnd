// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        latestProduct: builder.query({ query: () => "latest", providesTags: ["product"] }),
        allProduct: builder.query({ query: (email) => `admin-products?email=${email}` }),
        // NOTE : requires admin routes 
        categories: builder.query({ query: () => "categories", providesTags: ["product"] }),
        seachProduct: builder.query({
            query: ({ search, sort, category, price, page }) => {
                let base = `search/?name=${search}&page=${page}`;
                if (sort)
                    base += `&sort=${sort}`;
                if (price)
                    base += `&price=${price}`;
                if (category)
                    base += `&category=${category}`;
                return base;
            },
            providesTags: ["product"]
        }),
        newProducts: builder.mutation({
            query: ({ email, formdata }) => ({
                url: `new/?email=${email}`,
                method: 'POST',
                body: formdata,
            }),
            invalidatesTags: ["product"],
        }),
        productDetails: builder.query({
            query: (id) => `id?id=${id}`,
            // query : (id) => `${id}`, 
            providesTags: ["product"],
        }),
        updateProudct: builder.mutation({
            query: ({ id, email, formdata }) => ({
                url: `/id?id=${id}&email=${email}`,
                method: "PUT",
                body: formdata,
            }), invalidatesTags: ["product"]
        }),
        deleteProduct: builder.mutation({
            query: ({ email, id }) => ({
                url: `id/?email=${email}&id=${id}`,
                method: "DELETE",
            }), invalidatesTags: ["product"]
        })
    })
});
export const { useLatestProductQuery, useCategoriesQuery, useSeachProductQuery, useNewProductsMutation, useUpdateProudctMutation, useDeleteProductMutation, useProductDetailsQuery, useAllProductQuery } = productApi;
