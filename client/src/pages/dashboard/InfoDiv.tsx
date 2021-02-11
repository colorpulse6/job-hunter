import React from "react";
import { Link } from "react-router-dom";
import ChallengeComp from "../../pages/tasks/challenges/ChallengeComp";
import LearningComp from "../../pages/tasks/learning/LearningComp";
import {
  Card,
  CardContent,
} from "../../styles/styled-components/StyledContainers";

import { HeaderSecondary } from "../../styles/styled-components/StyledText";

const InfoDiv = (props) => {
  let { state, element, url, taskState } = props;

  return (
    <Card
      flex
      noBorder={!(state && state.length > 0) || element === "Challenges"}
      center
      column={element === "Learning"}
      roundedCorners={element === "Learning"}
      shadow={element === "Learning" && state && state.length > 0}
    >
      {element === "Challenges" ? (
        <CardContent>
          <ChallengeComp taskState={taskState} dashBoard />
        </CardContent>
      ) : null}
      

      <CardContent flex culumn>
        {element === "Learning" ? (
          <LearningComp taskState={taskState} dashBoard />
        ) : null}
      </CardContent>
    </Card>
  );
};

export default InfoDiv;
