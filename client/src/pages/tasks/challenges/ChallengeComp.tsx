import React from "react";
import axios from "axios";
import config from "../../../config";
import {
  Card,
  CardContent,
  Flex,
  CardContainer,
} from "../../../styles/styled-components/StyledContainers";
import { StyledIcon } from "../../../styles/styled-components/StyledElements";
import EditIcon from "../../../assets/edit-icon-white.png";
import Trash from "../../../assets/trash-icon.png";

const ChallengeComp = (props) => {
  const { taskState, removeChallenge } = props;

  return (
    <>
      <CardContainer flex wrap noBorder noShadow>
        {taskState.challenges && taskState.challenges.length > 0 ? (
          taskState.challenges.map((challenge, index) => {
            return (
              <Card short shadow roundedCorners margin noBorder key={index}>
                <CardContent>
                  <Flex spaceBetween>
                    <StyledIcon small src={EditIcon} />
                    <StyledIcon
                      small
                      src={Trash}
                      onClick={() => removeChallenge(index)}
                    />
                  </Flex>
                  <p>Title: {challenge.name}</p>
                  <p>
                    <a href={challenge.url} target="_blank">
                      Url: {challenge.url}
                    </a>
                  </p>

                  <p>
                    <a href={challenge.repo}>Repo: {challenge.repo}</a>
                  </p>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <p>No Challenges</p>
        )}
      </CardContainer>
    </>
  );
};

export default ChallengeComp;
