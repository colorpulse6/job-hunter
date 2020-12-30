import React from "react";
import axios from "axios";
import config from "../../../config";
import {
  Card,
  CardContent,
  Flex,
  CardContainer
} from "../../../styles/styled-components/StyledContainers";

const ChallengeComp = (props) => {
  const { taskState, removeChallenge } = props;

  return (
    <>
      <CardContainer flex wrap >
        {taskState.challenges
          ? taskState.challenges.map((challenge, index) => {
              return (
                <Card short shadow roundedCorners margin noBorder key={index}>
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
      </CardContainer>
    </>
  );
};

export default ChallengeComp;
