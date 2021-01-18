import React from "react";

import {
  Card,
  Flex,
  CardContent,
  CardContainer
} from "../../../styles/styled-components/StyledContainers";
import {
  HeaderSecondary,
  TinyText
} from "../../../styles/styled-components/StyledText";
import {
  StyledIcon
} from "../../../styles/styled-components/StyledElements";
import TrashIcon from '../../../assets/trash-icon.png'
import { formatDate } from "../../../javascript/DateFunctions";

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
                <CardContent flex >
                <TinyText style={{position:"relative", left:"370px"}}> Added On: {formatDate(learning.dateAdded)}</TinyText>
                  <HeaderSecondary>{learning.name}</HeaderSecondary>
                  
                  
                  <p>{learning.tutorial_url}</p>
                  <p>{learning.due_date ? formatDate(learning.due_date) : null}</p>
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
