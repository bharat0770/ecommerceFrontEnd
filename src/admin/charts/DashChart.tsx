import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getMonths } from '../../utils/features';

const DashChart = ({data}) =>  {
const {last6months} =getMonths(); 
    const formattedData = data.sixMonthOrderCount.map((count, index) => ({
        month: last6months[index],
        count : count,
    }));    
    return (
    <>  
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip /> 
                <Legend />
                <Bar dataKey="count" fill='#7570b3'/>
            </BarChart>
        </ResponsiveContainer>
    </>
)
}
export default DashChart; 