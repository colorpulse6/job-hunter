import React, { useContext, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import config from "../../config";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { JobParams } from "../../interfaces"
type TParams = {
  jobId: string;
};


interface Props extends RouteComponentProps { }

const JobOverview = ({ match }: RouteComponentProps<TParams>) => {
  const [job, setJob] = useState<JobParams>({} as JobParams);
  const jobId = match.params.jobId;

  useEffect(() => {
    axios
      .get(`${config.API_URL}/jobs/job-detail/${jobId}`)
      .then((result) => {
        console.log(result.data);
        setJob(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }, []);

  return (
    <div>
      <div>
        <div>
          <h3>Job Overview</h3>
         

          {job ? (
            <div>
              <p>Company: {job.company_name}</p>

              <p>Job Title: {job.job_title}</p>
              <p>Description: {job.job_description}</p>
          <p>Category: {Object.keys(job).find((key) => job[key] === true)}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default withRouter(JobOverview as any);
