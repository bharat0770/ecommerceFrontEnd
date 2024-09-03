import React from 'react'
import { usePieChartQuery } from '../../redux/api/dashboard';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Paper, Typography } from '@mui/material';

const PieCharts = () => {
    const { data, isLoading, isError } = usePieChartQuery("bharatsuthar9324@gmail.com");

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading data...</div>;
    const {
        adminCustomerRatio,
        usersAgeGroup,
        revenueDistribution,
        stockAvailablity,
        productCategories,
        orderFullfillment,
    } = data.message!;
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

    const renderPieChart = (title: string, pieData: { name: string, value: number }[]): JSX.Element => {
        return (
            <>
                <Grid item>
                    <Paper style={{ padding: '16px', marginBottom: '24px' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>{title}</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    innerRadius={40}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </>

        )
    }

    let charts: JSX.Element[] = [];
    for (let key in data.message!) {
        let value = data.message[key]
        if (Array.isArray(value)) {
            charts.push(renderPieChart(key, value));
        } else if (typeof value === "object") {
            const pieData = Object.keys(value).map(i => ({ name: i, value: value[i] }))
            charts.push(renderPieChart(key, pieData));
        }
    };

    return <div>{charts}</div>
};
export default PieCharts; 