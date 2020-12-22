import React from 'react'
import axios from "axios";
import config from "../../../config";
import { Card, CardContent } from "../../../styles/styled-components/StyledContainers";

const ChallengeComp = (props) => {
    const {taskState, removeChallenge } = props
    
    
    return (
        <>
             {taskState.challenges
          ? taskState.challenges.map((challenge, index) => {
              return (
                <Card medium key={index}>
                    <CardContent>
                  <p>{challenge.name}</p>
                  <p>{challenge.repo}</p>
                  <p>{challenge.url}</p>


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
