import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import JobOverview from "./job/JobOverview";
import JobContacts from "./job/JobContacts";
import JobTasks from "./job/JobTasks";
import JobNotes from "./job/JobNotes";
import { JobParams } from "../../interfaces";

import {
  NavContainer,
  NavLinks,
  NavItem,
} from "../../styles/styled-components/StylesNavbar";


import {
  CardContent,
} from "../../styles/styled-components/StyledContainers";

import {
  HeaderMain,
  HeaderSecondary
} from "../../styles/styled-components/StyledText";

type TParams = {
  jobId: string;
};

// { match }: RouteComponentProps<TParams>
// const jobId = props.match.params.jobId;

const JobNav = (props) => {
  // const jobContext = useContext(JobContext);
  // const { jobDetail, getJobDetail } = jobContext;
  console.log(props)
  const [page, setPage] = useState("overview");
  const [jobState, setJob] = useState<JobParams>({ job: {} } as JobParams);

  const {job, jobId} = props.location.state;

  useEffect(() => {
    getJobDetail();
  }, []);

  let getJobDetail = () => {
    axios
      .get(`${config.API_URL}/jobs/job-detail/${jobId}`)
      .then((result) => {
        console.log(result.data);
        setJob(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };
console.log(job)
  return (
    <CardContent jobModal paddingTop>
      <CardContent >
        <HeaderMain noPadding>
          <strong>{job.company_name}</strong>
        </HeaderMain>

        <HeaderSecondary>
          {job.job_title}
        </HeaderSecondary>
        <p>
          Category:{" "}
          {job.job_category}
        </p>
      </CardContent>
      
        <NavLinks spaceAround backgroundColor>
          <NavItem
            primary
            jobDetailPage
            jobDetailActive={page === "overview"}
            onClick={() => setPage("overview")}
          >
            Job Overview
          </NavItem>
          <NavItem
            primary
            jobDetailPage
            jobDetailActive={page === "contacts"}
            role="button"
            onClick={() => setPage("contacts")}
          >
            Job Contacts
          </NavItem>
          <NavItem
            primary
            jobDetailPage
            jobDetailActive={page === "tasks"}
            role="button"
            onClick={() => setPage("tasks")}
          >
            Job Tasks
          </NavItem>
          <NavItem
            primary
            jobDetailPage
            jobDetailActive={page === "notes"}
            role="button"
            onClick={() => setPage("notes")}
          >
            Job Notes
          </NavItem>
        </NavLinks>
     
      {page === "overview" ? <JobOverview {...jobState} getJob={getJobDetail} /> : null}
      {page === "contacts" ? (
        <JobContacts job={jobState} getJob={getJobDetail} />
      ) : null}
      {page === "tasks" ? <JobTasks job={jobState} getJob={getJobDetail} /> : null}
      {page === "notes" ? <JobNotes job={jobState} /> : null}
    </CardContent>

  );
};

export default JobNav;
