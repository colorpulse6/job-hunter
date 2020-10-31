import React from 'react'
import { PieChart, Pie, Sector, Cell, Label } from "recharts";

const PieChartComp = (props) => {
console.log(props)
    const data = [
        {
          name: "Group A",
          value: props.nominator,
        },
        {
          name: "Group B",
          value: Number(props.denominator),
        },
      ];

      const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div>
            <PieChart width={400} height={200}>
            <Pie
              data={data}
              cx={120}
              cy={100}
              innerRadius={40}
              outerRadius={50}
              fill="#8884d8"
              // paddingAngle={5}
              dataKey="value"
            >
              <Label value={`${props.nominator} out of ${props.denominator}`} position="center" />
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
            
        </div>
    )
}

export default PieChartComp
