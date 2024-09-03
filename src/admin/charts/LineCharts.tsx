import { Grid, Paper } from "@mui/material";
import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useLineChartQuery } from '../../redux/api/dashboard';
import { getMonths } from '../../utils/features';
const LineCharts = () => {
  const { data, isLoading } = useLineChartQuery("bharatsuthar9324@gmail.com");
  if (isLoading) return <div>Loading...</div>
  console.log(data);
  const {
    getDiscount,
    getOrders,
    getProducts,
    getRevenue,
    getUsers,
  } = data.message

  const { last12months, } = getMonths();
  const getDiscountData = getDiscount.map((e, idx) => ({
    value: e, month: last12months[idx]
  }))
  console.log(getDiscountData);
  const getOrdersData = getOrders.map((e, idx) => ({
    value: e, month: last12months[idx]
  }))

  const getProductsData = getProducts.map((e, idx) => ({
    value: e, month: last12months[idx]
  }))

  const getRevenueData = getRevenue.map((e, idx) => ({
    value: e, month: last12months[idx]
  }))

  const getUsersData = getUsers.map((e, idx) => ({
    value: e, month: last12months[idx]
  }))

  return (
    <>
      <Grid item style={{ margin: "20px" }}>
        <h2>DiscountData</h2>
        <Paper>
          <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={getDiscountData} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={"month"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey={"value"} type={"monotone"} stroke="#ff7f0e " name="Discount" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item style={{ margin: "20px" }}>
        <h2>OrdersData</h2>
        <Paper>
          <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={getOrdersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={"month"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey={"value"} type={"monotone"} stroke="#8c564b " name="Orders" />

            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item style={{ margin: "20px" }}>
        <h2>getProductsData</h2>
        <Paper>
          <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={getProductsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={"month"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey={"value"} type={"monotone"} stroke="#66c2a5 " name="Products" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item style={{ margin: "20px" }}>
        <h2>getRevenueData</h2>
        <Paper>
          <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={getRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={"month"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey={"value"} type={"monotone"} stroke="#a9a9a9" name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
      <Grid item style={{ margin: "20px" }}>
        <h2>getUsersData</h2>
        <Paper>
          <ResponsiveContainer width={"100%"} height={300}>
            <LineChart data={getUsersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={"month"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey={"value"} type={"monotone"} stroke="#ff69b4 " name="Users" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>



    </>
  )
}
export default LineCharts;


