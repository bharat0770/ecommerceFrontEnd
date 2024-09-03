import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
const CircularPrgressBar = ({ name, value, fill }) => {
    if (value > 1000) {
        value = 999;
    }
    let formattedData = [
        {
            name: name,
            value: value,
            fill: fill,
        }
    ];
    return (_jsx(_Fragment, { children: _jsx(ResponsiveContainer, { width: "100%", height: 100, children: _jsxs(RadialBarChart, { cx: "50%", cy: "50%", innerRadius: "80%", outerRadius: "100%", data: formattedData, startAngle: 90, endAngle: 450, children: [_jsx(RadialBar, { dataKey: "value" }), _jsxs("text", { x: "50%", y: "50%", textAnchor: "middle", dominantBaseline: "middle", fontSize: "24px", children: [value, "%"] })] }) }) }));
};
export default CircularPrgressBar;
