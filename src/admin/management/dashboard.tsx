import React from 'react';
import { useStatsQuery } from '../../redux/api/dashboard';
import { useSelector } from 'react-redux';
import { userReducerInitialState } from '../../types/reducer-types';
import { colors, Grid, Paper, Typography, Box } from '@mui/material';
import DashChart from '../charts/DashChart';
import GenderRatioChart from '../charts/GenderRatioChart';
import TransactionTable from "../charts/TransactionTable";
import InventoryProgress from '../charts/InventoryProgress';
import CircularPrgressBar from '../charts/CircularPrgressBar';

const Dashboard = () => {
    const { user } = useSelector((state: { userReducer: userReducerInitialState }) => state.userReducer);
    const { data, isLoading, error } = useStatsQuery(user?.email);
    if (isLoading) return <Typography variant="h6">Loading...</Typography>;
    if (error) {
        return <Typography variant="h6" color="error">Error occurred</Typography>;
    }
    const statsData = data?.message;
    console.log(statsData)
    return (
        <Grid container spacing={3} sx={{ padding: 3}}>
            {/* Revenue */}
            <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>Revenue</Typography>
                    <Typography variant="h4" gutterBottom>₹{statsData?.count?.revenue || 0}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{statsData?.changeInPercent?.revenue || 0}%</Typography>
                    <CircularPrgressBar name="Revenue" value={statsData?.changeInPercent?.revenue || 0} fill="#7f7f7f"/>
                </Paper>
            </Grid>

            {/* User */}
            <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>User</Typography>
                    <Typography variant="h4" gutterBottom>{statsData?.count?.user || 0}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{statsData?.changeInPercent?.userPercent || 0}%</Typography>
                    <CircularPrgressBar name="User" value={statsData?.changeInPercent?.userPercent || 0} fill="#f0c76e"/>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>Product</Typography>
                    <Typography variant="h4" gutterBottom>{statsData?.count?.product}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{statsData?.changeInPercent?.productPercent || 0}%</Typography>
                    <CircularPrgressBar name="User" value={statsData?.changeInPercent?.productPercent} fill="#66c2a5 "/>
                </Paper>
            </Grid>

            {/* Order */}
            <Grid item xs={12} sm={6} md={3}>
                <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>Order</Typography>
                    <Typography variant="h4" gutterBottom>{statsData?.count?.order}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">{statsData?.changeInPercent?.orderPercent}%</Typography>
                    <CircularPrgressBar name="Order" value={statsData?.changeInPercent?.orderPercent} fill="#8c564b "/>
                </Paper>
            </Grid>

            {/* Charts */}
            <Grid item xs={12} md={8}>
                <Paper elevation={3} sx={{ padding: 2, }}>
                    <DashChart data={statsData?.chart}/>
                </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ padding: 2,}}>
                        <InventoryProgress data={statsData?.categoryCount}/>
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <GenderRatioChart data={statsData?.userRatio} />
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="h6" textAlign="center" gutterBottom>Top Transactions</Typography>
                    <TransactionTable data={statsData?.modifiedTransactions}/>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
