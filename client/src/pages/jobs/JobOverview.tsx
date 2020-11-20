import React, {  useContext } from "react";
import { JobContext } from "../../context/JobContext";
import {  withRouter } from "react-router-dom";
import {
  PageContainer,
} from "../../styles/styled-components/StyledContainers";
const JobOverview = (props) => {

  return (
    <PageContainer>
  
      {
        <div>
          
          <p>Job Description: {props.job_description}</p>
          
        </div>
      }
    </PageContainer>
  );
};

export default JobOverview;
