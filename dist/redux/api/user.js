import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user,
            }),
        }),
        allUsers: builder.query({
            query: (email) => `all?email=${email}`,
        }),
        deleteUser: builder.mutation({
            query: ({ userEmail, email }) => ({
                url: `delete?email=${email}&userEmail=${userEmail}`,
                method: "DELETE",
            }),
        }),
    })
});
export const getUser = async (email) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/email?email=${email}`);
        return res;
    }
    catch (e) {
        console.log(e.message);
    }
};
// useLoginMutation is a     hook based on login endpoint 
export const { useLoginMutation, useAllUsersQuery, useDeleteUserMutation } = userApi;
