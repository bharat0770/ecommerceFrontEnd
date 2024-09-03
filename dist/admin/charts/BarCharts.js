import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { getMonths } from "../../utils/features";
import { useBarChartQuery } from "../../redux/api/dashboard";
import { Grid, Paper } from "@mui/material";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
const BarCharts = () => {
    const { last12months, last6months } = getMonths();
    const { data, isLoading, isError } = useBarChartQuery("bharatsuthar9324@gmail.com");
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
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
    return (_jsxs(_Fragment, { children: [_jsx(Grid, { item: true, style: { margin: "20px" }, children: _jsx(Paper, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: combinedData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "products", fill: "#a9a9a9" }), _jsx(Bar, { dataKey: "users", fill: "#17becf  " })] }) }) }) }), _jsx(Grid, { item: true, style: { margin: "20px" }, children: _jsx(Paper, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: getOrdersData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "orders", fill: "#ff69b4 " })] }) }) }) })] }));
};
export default BarCharts;
