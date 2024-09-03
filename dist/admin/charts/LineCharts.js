import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Grid, Paper } from "@mui/material";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useLineChartQuery } from '../../redux/api/dashboard';
import { getMonths } from '../../utils/features';
const LineCharts = () => {
    const { data, isLoading } = useLineChartQuery("bharatsuthar9324@gmail.com");
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    console.log(data);
    const { getDiscount, getOrders, getProducts, getRevenue, getUsers, } = data.message;
    const { last12months, } = getMonths();
    const getDiscountData = getDiscount.map((e, idx) => ({
        value: e, month: last12months[idx]
    }));
    console.log(getDiscountData);
    const getOrdersData = getOrders.map((e, idx) => ({
        value: e, month: last12months[idx]
    }));
    const getProductsData = getProducts.map((e, idx) => ({
        value: e, month: last12months[idx]
    }));
    const getRevenueData = getRevenue.map((e, idx) => ({
        value: e, month: last12months[idx]
    }));
    const getUsersData = getUsers.map((e, idx) => ({
        value: e, month: last12months[idx]
    }));
    return (_jsxs(_Fragment, { children: [_jsxs(Grid, { item: true, style: { margin: "20px" }, children: [_jsx("h2", { children: "DiscountData" }), _jsx(Paper, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: getDiscountData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { dataKey: "value", type: "monotone", stroke: "#ff7f0e ", name: "Discount" })] }) }) })] }), _jsxs(Grid, { item: true, style: { margin: "20px" }, children: [_jsx("h2", { children: "OrdersData" }), _jsx(Paper, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: getOrdersData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { dataKey: "value", type: "monotone", stroke: "#8c564b ", name: "Orders" })] }) }) })] }), _jsxs(Grid, { item: true, style: { margin: "20px" }, children: [_jsx("h2", { children: "getProductsData" }), _jsx(Paper, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: getProductsData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { dataKey: "value", type: "monotone", stroke: "#66c2a5 ", name: "Products" })] }) }) })] }), _jsxs(Grid, { item: true, style: { margin: "20px" }, children: [_jsx("h2", { children: "getRevenueData" }), _jsx(Paper, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: getRevenueData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { dataKey: "value", type: "monotone", stroke: "#a9a9a9", name: "Revenue" })] }) }) })] }), _jsxs(Grid, { item: true, style: { margin: "20px" }, children: [_jsx("h2", { children: "getUsersData" }), _jsx(Paper, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: getUsersData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { dataKey: "value", type: "monotone", stroke: "#ff69b4 ", name: "Users" })] }) }) })] })] }));
};
export default LineCharts;
