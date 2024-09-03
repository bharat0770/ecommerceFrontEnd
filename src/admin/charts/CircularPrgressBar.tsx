import React from 'react'
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
const CircularPrgressBar = ({ name, value, fill }) => {
    if(value > 1000){
        value = 999;    
    }
    let formattedData = [
        {
            name: name,
            value: value,
            fill: fill,
        }
    ]

    return (
        <>
            <ResponsiveContainer width="100%" height={100} >
                <RadialBarChart cx="50%" cy="50%" innerRadius="80%" outerRadius="100%"  data={formattedData} startAngle={90} endAngle={450}>
                    <RadialBar dataKey="value" />
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="24px">
                        {value}%
                    </text>
                </RadialBarChart>
            </ResponsiveContainer>
        </>
    )
}
export default CircularPrgressBar; 