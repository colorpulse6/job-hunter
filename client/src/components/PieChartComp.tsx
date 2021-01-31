import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Sector, Cell, Label } from "recharts";
import { setConstantValue } from 'typescript';

const PieChartComp = (props) => {
  const [value, setValue ] = useState(Number(props.denominator) - props.nominator)
  useEffect(()=>{
    if(props.nominator > props.denominator){
      setValue(0)
    }

  }, [props])
  
    const data = [
        {
          name: "Group A",
          value: props.nominator,
        },
        {
          name: "Group B",
          value: value,
        }, 
      ];

      const COLORS = ["#357FFF", "#702382", "#FFBB28", "#FF8042"];

    return (
        <div>
            <PieChart width={200} height={170}>
            <Pie
              data={data}
              cx={75}
              cy={75}
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
