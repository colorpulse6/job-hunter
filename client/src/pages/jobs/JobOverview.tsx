import React, { useEffect, useContext } from "react";
import { JobContext } from "../../context/JobContext";
import { RouteComponentProps, withRouter } from "react-router-dom";
import JobNav from "../../pages/jobs/JobNav";

const JobOverview = (props) => {
  const jobContext = useContext(JobContext);
  const { getJobDetail, jobDetail } = jobContext;

  // useEffect(()=>{
  //   getJobDetail(props.jobId)
  // }, [props])
  return (
    <div>
      {/* <JobNav /> */}

      <h3>Job Overview</h3>

      {
        <div>
          <p>Company: {props.company_name}</p>

          <p>Job Title: {props.job_title}</p>
          <p>Description: {props.job_description}</p>
          <p>
            Category:{" "}
            {Object.keys(props).find((key) => props[key] === true)}
          </p>
        </div>
      }
    </div>
  );
};

export default withRouter(JobOverview as any);
