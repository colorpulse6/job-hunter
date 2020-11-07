import React, { useContext } from "react";

import { JobContext } from "../../context/JobContext";
import JobBoardRender from "./JobBoardRender"

const JobCategory = (props) => {
  const jobContext = useContext(JobContext);
  const { jobState, getJobs } = jobContext;


  return (
    <>
    <JobBoardRender handleStar={props.handleStar} removeJob={props.removeJob} jobs={jobState} changeStatus={props.changeStatus} jobAdded={props.jobAdded}></JobBoardRender>
    
    </>
  );
};

export default JobCategory;
