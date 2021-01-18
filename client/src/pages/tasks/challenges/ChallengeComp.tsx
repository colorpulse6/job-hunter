import React, { useState, useContext } from "react";
import { formatDate } from "../../../javascript/DateFunctions";

import { JobContext } from "../../../context/JobContext";
import Modal from "../../../components/Modal";
import AddChallenge from "./AddChallenge";

import {
  Card,
  CardContent,
  Flex,
  CardContainer,
} from "../../../styles/styled-components/StyledContainers";
import {
  HeaderSecondary,
  LimitLinkText,
} from "../../../styles/styled-components/StyledText";
import RepoIcon from "../../../assets/repo-icon.png";
import UrlIcon from "../../../assets/url-icon.png";
import JobIcon from "../../../assets/job-icon.png";
import {
  StyledIcon,
  StyledButton,
} from "../../../styles/styled-components/StyledElements";
import Trash from "../../../assets/trash-icon.png";

const ChallengeComp = (props) => {
  const { taskState, getTasks, removeChallenge } = props;
  const jobContext = useContext(JobContext);
  const [challengeEdited, setChallengeEdited] = useState(false);
  const { jobState } = jobContext;
  
  const weirdSlice = (element, prop) => {
    if (prop) {
      return element.slice(0, 2);
    } else {
      return element;
    }
  };

  return (
    <>
      <CardContainer flex wrap noBorder center noShadow noBackground>
        {taskState.challenges && taskState.challenges.length > 0 ? (
          weirdSlice(taskState.challenges, props.dashBoard).map(
            (challenge, index) => {
              return (
                <div style={{ padding: "10px" }}>
                  <Card
                    flex
                    column
                    shorter={!props.dashboard}
                    roundedCorners
                    smallFont
                    shadow
                    mediumShort={props.dashBoard}
                  >
                    <HeaderSecondary
                      marginBottom
                      noPadding
                      smallFont
                      centerText
                    >
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
                      <LimitLinkText href={challenge.url} target="_blank">
                        {challenge.url}
                      </LimitLinkText>
                    </div>

                    <div>
                      <StyledIcon src={RepoIcon} tiny paddingRight></StyledIcon>
                      <a href={challenge.repo} target="_blank">
                        {challenge.repo}
                      </a>
                    </div>
                    <StyledButton small noDisplay >
                      {challenge.due_date !== ""
                        ? formatDate(challenge.due_date)
                        : null}
                    </StyledButton>
                    {!props.dashBoard ? (
                      <Flex>
                        <StyledIcon
                          small
                          src={Trash}
                          onClick={() => removeChallenge(index)}
                        />

                        <Modal
                          editChallenge
                          content={
                            <AddChallenge
                              editChallenge
                              challengeAdded={challengeEdited}
                              setChallengeAdded={setChallengeEdited}
                              getTasks={getTasks}
                              challenge={challenge}
                              index={index}
                            />
                          }
                          toggleOn={challengeEdited}
                        />
                      </Flex>
                    ) : null}
                  </Card>
                </div>
              );
            }
          )
        ) : (
          <p>No Challenges</p>
        )}
      </CardContainer>
    </>
  );
};

export default ChallengeComp;
