import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../javascript/DateFunctions";

import {
  Card,
  CardContent,
} from "../../styles/styled-components/StyledContainers";
import {
  StyledIcon,
  StyledButton,
} from "../../styles/styled-components/StyledElements";

import { HeaderSecondary } from "../../styles/styled-components/StyledText";
import RepoIcon from "../../assets/repo-icon.png";
import UrlIcon from "../../assets/url-icon.png";
import JobIcon from "../../assets/job-icon.png";
import ChallengeComp from "../../pages/tasks/challenges/ChallengeComp";
const InfoDiv = (props) => {
  let { state, jobs, element, url, taskState } = props;
  console.group(jobs);
  return (
    <Card
      flex
      noBorder={element === "Challenges"}
      center
      column={element === "Learning"}
      roundedCorners={element === "Learning"}
      shadow={element === "Learning"}
    >
      {state && state.length > 0 ? (
        state.slice(0, 2).map((item, index) => {
          return item.completed === false ? (
            <CardContent key={index}>
              {element === "Challenges" ? (
                <ChallengeComp taskState={taskState} />
              ) : null}
              {element === "Learning" ? (
                <Card noBorder noPadding>
                  <HeaderSecondary noPadding marginBottom smallFont>
                    {item.name}
                  </HeaderSecondary>
                  <a
                    href={item.tutorial_url}
                    style={{ marginLeft: "10px" }}
                    target="_blank"
                  >
                    {item.tutorial_url}
                  </a>{" "}
                </Card>
              ) : null}
            </CardContent>
          ) : null;
        })
      ) : (
        <div>
          <p>No {element}...</p>
          <Link to={`${url}`}>Add {element}?</Link>
        </div>
      )}
    </Card>
  );
};

export default InfoDiv;
