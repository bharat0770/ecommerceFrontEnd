import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMonths } from '../../utils/features';
const DashChart = ({ data }) => {
    const { last6months } = getMonths();
    const formattedData = data.sixMonthOrderCount.map((count, index) => ({
        month: last6months[index],
        count: count,
    }));
    return (_jsx(_Fragment, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: formattedData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "count", fill: '#7570b3' })] }) }) }));
};
export default DashChart;
