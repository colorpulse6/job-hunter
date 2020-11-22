import React from 'react'
import axios from "axios";
import config from "../../../config";
import { Card, CardContent } from "../../../styles/styled-components/StyledContainers";

const LearningComp = (props) => {
    const{ taskState, getTasks } = props

    const removeLearning = (index) => {
        console.log(index);
        axios
          .post(
            `${config.API_URL}/tasks/learning/delete-learning`,
            {
              index,
            },
            { withCredentials: true }
          )
          .then((result) => {
            getTasks();
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    return (
        <>
        {taskState.learning
            ? taskState.learning.map((learning, index) => {
                return (
                  <Card medium key={index}>
                      <CardContent>
                    <p>{learning.name}</p>
                    <button onClick={() => removeLearning(index)}>X</button>
                    </CardContent>
                  </Card>
                );
              })
            : null}
            
        </>
    )
}

export default LearningComp
