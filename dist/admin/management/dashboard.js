import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStatsQuery } from '../../redux/api/dashboard';
import { useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@mui/material';
import DashChart from '../charts/DashChart';
import GenderRatioChart from '../charts/GenderRatioChart';
import TransactionTable from "../charts/TransactionTable";
import InventoryProgress from '../charts/InventoryProgress';
import CircularPrgressBar from '../charts/CircularPrgressBar';
const Dashboard = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { data, isLoading, error } = useStatsQuery(user?.email);
    if (isLoading)
        return _jsx(Typography, { variant: "h6", children: "Loading..." });
    if (error) {
        return _jsx(Typography, { variant: "h6", color: "error", children: "Error occurred" });
    }
    const statsData = data?.message;
    console.log(statsData);
    return (_jsxs(Grid, { container: true, spacing: 3, sx: { padding: 3 }, children: [_jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsxs(Paper, { elevation: 3, sx: { padding: 2, textAlign: 'center' }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Revenue" }), _jsxs(Typography, { variant: "h4", gutterBottom: true, children: ["\u20B9", statsData?.count?.revenue || 0] }), _jsxs(Typography, { variant: "subtitle1", color: "textSecondary", children: [statsData?.changeInPercent?.revenue || 0, "%"] }), _jsx(CircularPrgressBar, { name: "Revenue", value: statsData?.changeInPercent?.revenue || 0, fill: "#7f7f7f" })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsxs(Paper, { elevation: 3, sx: { padding: 2, textAlign: 'center' }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "User" }), _jsx(Typography, { variant: "h4", gutterBottom: true, children: statsData?.count?.user || 0 }), _jsxs(Typography, { variant: "subtitle1", color: "textSecondary", children: [statsData?.changeInPercent?.userPercent || 0, "%"] }), _jsx(CircularPrgressBar, { name: "User", value: statsData?.changeInPercent?.userPercent || 0, fill: "#f0c76e" })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsxs(Paper, { elevation: 3, sx: { padding: 2, textAlign: 'center' }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Product" }), _jsx(Typography, { variant: "h4", gutterBottom: true, children: statsData?.count?.product }), _jsxs(Typography, { variant: "subtitle1", color: "textSecondary", children: [statsData?.changeInPercent?.productPercent || 0, "%"] }), _jsx(CircularPrgressBar, { name: "User", value: statsData?.changeInPercent?.productPercent, fill: "#66c2a5 " })] }) }), _jsx(Grid, { item: true, xs: 12, sm: 6, md: 3, children: _jsxs(Paper, { elevation: 3, sx: { padding: 2, textAlign: 'center' }, children: [_jsx(Typography, { variant: "h6", gutterBottom: true, children: "Order" }), _jsx(Typography, { variant: "h4", gutterBottom: true, children: statsData?.count?.order }), _jsxs(Typography, { variant: "subtitle1", color: "textSecondary", children: [statsData?.changeInPercent?.orderPercent, "%"] }), _jsx(CircularPrgressBar, { name: "Order", value: statsData?.changeInPercent?.orderPercent, fill: "#8c564b " })] }) }), _jsx(Grid, { item: true, xs: 12, md: 8, children: _jsx(Paper, { elevation: 3, sx: { padding: 2, }, children: _jsx(DashChart, { data: statsData?.chart }) }) }), _jsx(Grid, { item: true, xs: 12, md: 4, children: _jsx(Paper, { elevation: 3, sx: { padding: 2, }, children: _jsx(InventoryProgress, { data: statsData?.categoryCount }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsx(Paper, { elevation: 3, sx: { padding: 2 }, children: _jsx(GenderRatioChart, { data: statsData?.userRatio }) }) }), _jsx(Grid, { item: true, xs: 12, md: 6, children: _jsxs(Paper, { elevation: 3, sx: { padding: 2 }, children: [_jsx(Typography, { variant: "h6", textAlign: "center", gutterBottom: true, children: "Top Transactions" }), _jsx(TransactionTable, { data: statsData?.modifiedTransactions })] }) })] }));
};
export default Dashboard;
