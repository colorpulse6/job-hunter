import React, { useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { formatDate } from "../../../javascript/DateFunctions";

import { JobContext } from "../../../context/JobContext";

import {
  Card,
  CardContent,
  Flex,
  CardContainer,
} from "../../../styles/styled-components/StyledContainers";
import { HeaderSecondary } from "../../../styles/styled-components/StyledText";
import RepoIcon from "../../../assets/repo-icon.png";
import UrlIcon from "../../../assets/url-icon.png";
import JobIcon from "../../../assets/job-icon.png";
import { StyledIcon, StyledButton } from "../../../styles/styled-components/StyledElements";
import EditIcon from "../../../assets/edit-icon-white.png";
import Trash from "../../../assets/trash-icon.png";

const ChallengeComp = (props) => {
  const { taskState, removeChallenge } = props;
  const jobContext = useContext(JobContext);

  const { jobState } = jobContext;
  return (
    <>
      <CardContainer flex wrap noBorder noShadow>
        {taskState.challenges && taskState.challenges.length > 0 ? (
          taskState.challenges.map((challenge, index) => {
            return (
              <Card flex column shorter roundedCorners smallFont shadow>
                  <HeaderSecondary marginBottom noPadding smallFont centerText>
                    <strong>{challenge.name}</strong>
                  </HeaderSecondary>
                  <hr></hr>
                  {jobState.map((job) => {
                    if (String(job.job_id) === challenge.job_ref) {
                      return (
                        <div>
                          <StyledIcon
                            src={JobIcon}
                            tiny
                            paddingRight
                          ></StyledIcon>

                          <a>{job.company_name}</a>
                        </div>
                      );
                    }
                  })}
                  <div>
                    <StyledIcon src={UrlIcon} tiny paddingRight></StyledIcon>
                    <a href={challenge.url} target="_blank">
                      Challenge Url
                    </a>
                  </div>

                  <div>
                    <StyledIcon src={RepoIcon} tiny paddingRight></StyledIcon>
                    <a href={challenge.repo} target="_blank">
                      Personal Repo
                    </a>
                  </div>
                  <StyledButton small noDisplay>
                    {challenge.due_date !== "" ? formatDate(challenge.due_date) : null}
                  </StyledButton>
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
