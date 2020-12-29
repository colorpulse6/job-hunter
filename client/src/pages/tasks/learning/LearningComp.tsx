import React from 'react'
import axios from "axios";
import config from "../../../config";
import { Card, CardContent } from "../../../styles/styled-components/StyledContainers";

const LearningComp = (props) => {
    const{ taskState } = props

    
    return (
        <>
        {taskState.learning
            ? taskState.learning.map((learning, index) => {
                return (
                  <Card medium flex
                  shadow
                  roundedCorners
                  noBorder
                  margin key={index}>
                      <CardContent>
                    <p>{learning.name}</p>
                    <button onClick={() => props.removeLearning(index)}>X</button>
                    </CardContent>
                  </Card>
                );
              })
            : null}
            
        </>
    )
}

export default LearningComp
