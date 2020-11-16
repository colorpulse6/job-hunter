import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import JobOverview from "./JobOverview";
import JobContacts from "./JobContacts";
import JobTasks from "./JobTasks";
import JobNotes from "./JobNotes";
import { JobParams } from "../../interfaces"

type TParams = {
  jobId: string;
  
};



const JobDetails = ({ match }: RouteComponentProps<TParams>) => {
    
  const [page, setPage] = useState("");
  const [job, setJob] = useState<JobParams>({job:{}} as JobParams);
  const jobId = match.params.jobId;
 
  useEffect(() => {
    getJob();
  }, []);

  let getJob = () => {
    axios
    .get(`${config.API_URL}/jobs/job-detail/${jobId}`)
    .then((result) => {
      console.log(result.data);
      setJob(result.data);
    })
    .catch((err) => {
      console.log(err.response.data.error);
    });
  }

  return (
    <div>
      <button onClick={() => setPage("overview")}>Job Overview</button>
      <button onClick={() => setPage("contacts")}>Job Contacts</button>
      <button onClick={() => setPage("tasks")}>Job Tasks</button>
      <button onClick={() => setPage("notes")}>Job Notes</button>

      {page === "overview" ? <JobOverview {...job} /> : null}
      {page === "contacts" ? <JobContacts job={job} getJob={getJob} /> : null}
      {page === "tasks" ? <JobTasks job={job} getJob={getJob}/> : null}
      {page === "notes" ? <JobNotes job={job}/> : null}
    </div>
  );
};

export default withRouter(JobDetails) as any;
