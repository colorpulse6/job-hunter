import React, { useContext } from "react";

import { JobContext } from "../../context/JobContext";
import JobBoardRender from "./JobBoardRender";

const JobCategory = (props) => {
  const jobContext = useContext(JobContext);
  const { jobState, getJobs } = jobContext;

  return (
    <>
      <JobBoardRender
        handleStar={props.handleStar}
        removeJob={props.removeJob}
        jobs={props.jobs}
        changeStatus={props.changeStatus}
        jobAdded={props.jobAdded}
        addJob={props.addJob}
        toggleOn={props.toggleOn}
      />
    </>
  );
};

export default JobCategory;
