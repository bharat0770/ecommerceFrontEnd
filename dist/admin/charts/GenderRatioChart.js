import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const GenderRatioChart = ({ data }) => {
    const pieData = [
        { name: "male", value: data.male, },
        { name: "female", value: data.female, }
    ];
    const COLORS = ['#377eb8', '#e377c2'];
    console.log(pieData);
    return (_jsx(_Fragment, { children: _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: pieData, dataKey: "value", nameKey: "name", cx: "50%", cy: "50%", outerRadius: 80, children: pieData.map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, {}), _jsx(Legend, {})] }) }) }));
};
export default GenderRatioChart;
