import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GenderRatioChart = ({ data }) => {
    const pieData = [
        {name:  "male" , value : data.male, },
        { name : "female", value: data.female, }
    ]
    
    const COLORS = ['#377eb8', '#e377c2'];
    console.log(pieData)
    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
            <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))} 
            </Pie>
            <Tooltip />
            <Legend />
            </PieChart>
            </ResponsiveContainer>
        </>
    )
}


export default GenderRatioChart;
