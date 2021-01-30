import React from "react";
import { Link } from "react-router-dom";
import ChallengeComp from "../../pages/tasks/challenges/ChallengeComp";

import {
  Card,
  CardContent,
} from "../../styles/styled-components/StyledContainers";

import { HeaderSecondary } from "../../styles/styled-components/StyledText";

const InfoDiv = (props) => {
  let { state, element, url, taskState } = props;
  console.group(state);

  return (
    <Card
      flex
      noBorder={element === "Challenges"}
      center
      column={element === "Learning"}
      roundedCorners={element === "Learning"}
      shadow={element === "Learning"}
    >
      {element === "Challenges" ? (
                    <CardContent >

        <ChallengeComp taskState={taskState} dashBoard />
        </CardContent>

      ) : (
null      )}
      {state && state.length > 0 ? (
        state.slice(0, 2).map((item:any, index:number) => {
          return item.completed === false ? (
            <CardContent key={index}>
              {element === "Learning" ? (
                <Card noBorder noPadding key={index}>
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
