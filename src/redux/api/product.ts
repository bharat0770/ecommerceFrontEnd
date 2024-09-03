// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { allProductResponse, categoriesResponse, deleteProductRequest, MessageResponse, newProductRequest, productDetailResponse, searchProductRequest, searchProductResponse, updateProductRequest } from "../../types/api-types";


export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        latestProduct: builder.query<allProductResponse, string>({ query: () => "latest", providesTags: ["product"]}),
        
        allProduct : builder.query<allProductResponse, string>({query : (email) => `admin-products?email=${email}`}),  
        // NOTE : requires admin routes 
        categories: builder.query<categoriesResponse, string>({ query: () => "categories", providesTags: ["product"] }),
        seachProduct: builder.query<searchProductResponse, searchProductRequest>({
            query: ({ search, sort, category, price, page }) => {
                let base = `search/?name=${search}&page=${page}`
                if (sort) base += `&sort=${sort}`
                if (price) base += `&price=${price}`
                if (category) base += `&category=${category}`
                return base;
            },
            providesTags: ["product"]
        }),
        newProducts: builder.mutation<MessageResponse, newProductRequest>({
            query: ({ email, formdata }) => ({
                url: `new/?email=${email}`,
                method: 'POST',
                body: formdata,
            }),
            invalidatesTags: ["product"],
        }),
        productDetails: builder.query<productDetailResponse, string>({
            query: (id) => `id?id=${id}`,
            // query : (id) => `${id}`, 
            providesTags: ["product"],
        }),
        updateProudct: builder.mutation<productDetailResponse, updateProductRequest>({
            query: ({ id, email, formdata }) => ({
                url: `/id?id=${id}&email=${email}`,
                method: "PUT",
                body: formdata,
            }), invalidatesTags: ["product"]
        }),
        deleteProduct: builder.mutation<MessageResponse, deleteProductRequest>({
            query: ({ email, id }) => ({
                url: `id/?email=${email}&id=${id}`,
                method: "DELETE",
            }), invalidatesTags: ["product"]
        })
    })
})

export const { useLatestProductQuery, useCategoriesQuery, useSeachProductQuery, useNewProductsMutation,  useUpdateProudctMutation, useDeleteProductMutation, useProductDetailsQuery, useAllProductQuery} = productApi;


