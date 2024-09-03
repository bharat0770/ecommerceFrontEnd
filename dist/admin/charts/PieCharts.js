import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { usePieChartQuery } from '../../redux/api/dashboard';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Paper } from '@mui/material';
const PieCharts = () => {
    const { data, isLoading, isError } = usePieChartQuery("bharatsuthar9324@gmail.com");
    if (isLoading)
        return _jsx("div", { children: "Loading..." });
    if (isError)
        return _jsx("div", { children: "Error loading data..." });
    const { adminCustomerRatio, usersAgeGroup, revenueDistribution, stockAvailablity, productCategories, orderFullfillment, } = data.message;
    const COLORS = [
        '#4E79A7',
        '#F28E2B',
        '#E15759',
        '#76B7B2',
        '#59A14F',
        '#EDC949',
        '#AF7AA1',
        '#FF9DA7',
        '#9C755F',
        '#BAB0AC'
    ];
    const renderPieChart = (title, pieData) => {
        return (_jsx(_Fragment, { children: _jsx(Grid, { item: true, children: _jsxs(Paper, { style: { padding: '16px', marginBottom: '24px' }, children: [_jsx("h3", { style: { textAlign: 'center', marginBottom: '16px' }, children: title }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: pieData, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 100, innerRadius: 40, children: pieData.map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, {}), _jsx(Legend, {})] }) })] }) }) }));
    };
    let charts = [];
    for (let key in data.message) {
        let value = data.message[key];
        if (Array.isArray(value)) {
            charts.push(renderPieChart(key, value));
        }
        else if (typeof value === "object") {
            const pieData = Object.keys(value).map(i => ({ name: i, value: value[i] }));
            charts.push(renderPieChart(key, pieData));
        }
    }
    ;
    return _jsx("div", { children: charts });
};
export default PieCharts;
