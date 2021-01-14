import React from "react";
import axios from "axios";
import config from "../../../config";
import {
  Card,
  CardContent,
  CardContainer
} from "../../../styles/styled-components/StyledContainers";
import {
  StyledIcon
} from "../../../styles/styled-components/StyledElements";
import TrashIcon from '../../../assets/trash-icon.png'
const LearningComp = (props) => {
  const { taskState } = props;
  console.log(taskState)
  return (
    <CardContainer flex noBorder noShadow wrap noBackground>
      {taskState.learning
        ? taskState.learning.map((learning, index) => {
            return (
              <Card
                medium
                flex
                shadow
                roundedCorners
                noBorder
                margin
                key={index}
              >
                <CardContent >
                  <p>{learning.name}</p>
                  <p>{learning.tutorial_url}</p>

                  <StyledIcon small onClick={() => props.removeLearning(index)} src={TrashIcon} />
                </CardContent>
              </Card>
            );
          })
        : null}
    </CardContainer>
  );
};

export default LearningComp;
