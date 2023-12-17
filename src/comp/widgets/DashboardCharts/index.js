import React from 'react';
import { BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart } from 'recharts';
// styles
import './style.css';

const DashboardCharts = () => {

    // const data = [
    //     { name: 'Eureka', earning: 10 },
    //     { name: 'Maklek', earning: 20 },
    //     { name: 'Europharm', earning: 30 },
    //     { name: 'Zegin', earning: 24 },
    //     { name: 'Phoenix', earning: 24 },
    //     { name: 'Prima', earning: 24 },
    //     { name: 'Vita', earning: 100 }
    // ];
    const data = [
        {
          name: 'Page A',
          uv: 5000,
          pv: 1400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 400,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 8000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];

    const CustomBar = (props) => {
        return (
            <rect
                x={props.x}
                y={props.y}
                width={props.width}
                height={props.height}
                fill="#27bd1c"
                rx={8}
            />
        )
    }

    return (
        <div className='dashboard-charts'>
            <ResponsiveContainer width="99%" height={400} className="barchart-container">
                {/* <div>div</div> */}
            <AreaChart data={data} margin={{left: 30}}>
            <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
                {/* <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 500]} height={20} />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="earning" fill="#27bd1c" className='barchart-container__bar' shape={<CustomBar />}/> */}
            </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default DashboardCharts;