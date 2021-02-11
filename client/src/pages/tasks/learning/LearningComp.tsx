import React, { useState, useEffect } from "react";

import {
  Card,
  Flex,
  CardContent,
  CardContainer,
} from "../../../styles/styled-components/StyledContainers";
import {
  HeaderSecondary,
  TinyText,
} from "../../../styles/styled-components/StyledText";
import { StyledIcon } from "../../../styles/styled-components/StyledElements";
import TrashIcon from "../../../assets/trash-icon.png";
import NewTabIcon from "../../../assets/new-tab.png";
import { formatDate } from "../../../javascript/DateFunctions";


const LearningComp = (props) => {
  const { taskState } = props;

  const weirdSlice = (element, prop) => {
    if (prop) {
      return element.slice(0, 2);
    } else {
      return element;
    }
  };

  return (
    <CardContainer flex noBorder noShadow wrap noBackground>
      {taskState.learning && taskState.learning.length > 0 ? (
          weirdSlice(taskState.learning, props.dashBoard).map((learning, index) => {
            if(learning.tutorial_url){
            return (
              <Card square shadow roundedCorners noBorder key={index}>
                <CardContent flex column centerText>
                  <TinyText>
                    Added On: {formatDate(learning.dateAdded)}
                  </TinyText>
                  <a href={learning.tutorial_url} target="_blank">
                    <div style={{ display: "inline-block" }}>
                      <HeaderSecondary>{learning.name}</HeaderSecondary>
                    </div>
                    <StyledIcon
                      tiny
                      src={NewTabIcon}
                      style={{ marginBottom: "5px" }}
                    />
                    <div>
                      <img
                        src={learning.image_url}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  </a>
                  <p>
                    {learning.due_date ? formatDate(learning.due_date) : null}
                  </p>
                  {!props.dashBoard ? (
                    <StyledIcon
                      small
                      onClick={() => props.removeLearning(index)}
                      src={TrashIcon}
                      style={{ top: "-12px", left: "83px" }}
                    />
                  ) : null}
                </CardContent>
              </Card>
            );
                  }
          }
          )
          )
        : null}
    </CardContainer>
  );
};

export default LearningComp;
