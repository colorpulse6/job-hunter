import React from "react";
import { Link } from "react-router-dom";
import {
  CardContainer,
  CardContent,
} from "../../styles/styled-components/StyledContainers";

import { HeaderMain } from "../../styles/styled-components/StyledText";

const StarredJobs = (props) => {
  const { jobState } = props;
  return (
    <>
      <CardContainer>
        <HeaderMain centerText>Starred Jobs</HeaderMain>

        {jobState.length > 0 ? (
          jobState.map((job, index) => {
            return job.star ? (
              <CardContent key={index}>
                <p>{job.company_name}</p>
              </CardContent>
            ) : null;
          })
        ) : (
          <CardContent>
            <p>No Starred Jobs...</p>
            <Link to="/job-board">Add a Favorite?</Link>
          </CardContent>
        )}
      </CardContainer>
    </>
  );
};

export default StarredJobs;
