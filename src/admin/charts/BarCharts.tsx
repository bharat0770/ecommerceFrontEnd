import React from "react";
import { getMonths } from "../../utils/features";
import { useBarChartQuery } from "../../redux/api/dashboard";
import { Grid, Paper } from "@mui/material";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";


const BarCharts = () => {
    const { last12months, last6months } = getMonths();
    const { data, isLoading, isError } = useBarChartQuery(
        "bharatsuthar9324@gmail.com"
    );
    if (isLoading) return <div>Loading...</div>;
    const { getOrders, getProducts, getUsers } = data.message;
    console.log(getOrders);
    const getOrdersData = getOrders.map((e, idx) => ({
        month: last12months[idx],
        orders: e,
    }));
    const getProductsData = getProducts.map((e, idx) => ({
        month: last6months[idx],
        products: e,
    }));

    const getUsersData = getUsers.map((e, idx) => ({
        month: last6months[idx],
        users: e,
    }));

    const combinedData = getUsers.map((e, idx) => ({
        month: last6months[idx],
        users: e,
        products: getProducts[idx],
    }));
    console.log(combinedData);
    return (
        <>
        <Grid item style={{margin : "20px"}}>
                <Paper>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={combinedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="products" fill="#a9a9a9" />
                            <Bar dataKey="users" fill="#17becf  " />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
            <Grid item style={{margin : "20px"}}>
                <Paper>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getOrdersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="orders" fill="#ff69b4 " />
                        </BarChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
        </>
    );
};
export default BarCharts;
