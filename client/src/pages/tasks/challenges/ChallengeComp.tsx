import React from 'react'
import axios from "axios";
import config from "../../../config";
import { Card, CardContent } from "../../../styles/styled-components/StyledContainers";

const ChallengeComp = (props) => {
    const {taskState, getTasks } = props
    const removeChallenge = (index) => {
        console.log(index);
        axios
          .post(
            `${config.API_URL}/tasks/challenges/delete-challenge`,
            {
              index,
            },
            { withCredentials: true }
          )
          .then(() => {
            getTasks();
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
    return (
        <>
             {taskState.challenges
          ? taskState.challenges.map((challenge, index) => {
              return (
                <Card medium key={index}>
                    <CardContent>
                  <p>{challenge.name}</p>
                  <button onClick={() => removeChallenge(index)}>X</button>
                  </CardContent>
                </Card>
              );
            })
          : null}
            
        </>
    )
}

export default ChallengeComp
