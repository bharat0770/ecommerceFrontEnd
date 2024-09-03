import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { LinearProgress, Typography, Box } from "@mui/material";
const InventoryProgress = ({ data }) => {
    return (_jsx(_Fragment, { children: _jsx(Box, { children: data.map(({ name, value }) => {
                return (_jsxs(Box, { mb: 2, display: "flex", alignItems: "center", justifyContent: "space-around", children: [_jsx(Typography, { variant: "h6", children: name }), _jsx(LinearProgress, { variant: "determinate", value: value, sx: { width: "50%", borderRadius: 5 } }), _jsx(Typography, { variant: "h6", children: `${value}%` })] }, name));
            }) }) }));
};
export default InventoryProgress;
