import React, { useEffect, useContext } from "react";
import { JobContext } from "../../context/JobContext";
import { RouteComponentProps, withRouter } from "react-router-dom";
import JobNav from "../../pages/jobs/JobNav";

const JobOverview = (props) => {
  const jobContext = useContext(JobContext);
  const { getJobDetail, jobDetail } = jobContext;
  
  useEffect(()=>{
    getJobDetail(props.jobId)
  })
  return (
    <div>
      <JobNav />

      <h3>Job Overview</h3>

      {
        <div>
          <p>Company: {jobDetail.company_name}</p>

          <p>Job Title: {jobDetail.job_title}</p>
          <p>Description: {jobDetail.job_description}</p>
          <p>
            Category:{" "}
            {Object.keys(jobDetail).find((key) => jobDetail[key] === true)}
          </p>
        </div>
      }
    </div>
  );
};

export default withRouter(JobOverview as any);
