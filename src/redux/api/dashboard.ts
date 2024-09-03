import { createApi, CreateApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dashboardApi = createApi({
    reducerPath : "dashboardApi", 
    baseQuery : fetchBaseQuery({
    baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/dashboard/`, 
    }), 
    endpoints : (builder) => ({
        stats : builder.query({
            query : (email) => `stats?email=${email}`, 
            keepUnusedDataFor : 0
        }), 
        
        barChart : builder.query({
            query : (email) => `bar?email=${email}`, 
            keepUnusedDataFor : 0
        }), 
        
        pieChart : builder.query({
            query : (email) => `pie?email=${email}`, 
            keepUnusedDataFor : 0
        }), 
        
        lineChart : builder.query({
            query : (email) => `line?email=${email}`, 
            keepUnusedDataFor : 0
        }), 
        
    })  
})
export default dashboardApi;
export const {useStatsQuery, useBarChartQuery, usePieChartQuery, useLineChartQuery} = dashboardApi; 