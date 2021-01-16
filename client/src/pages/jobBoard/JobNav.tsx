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

import { CardContent } from "../../styles/styled-components/StyledContainers";

import {
  HeaderMain,
  HeaderSecondary,
} from "../../styles/styled-components/StyledText";

type TParams = {
  jobId: string;
};

// { match }: RouteComponentProps<TParams>
// const jobId = props.match.params.jobId;

const JobNav = (props) => {
  // const jobContext = useContext(JobContext);
  // const { jobDetail, getJobDetail } = jobContext;
  const [page, setPage] = useState("overview");
  const [jobState, setJob] = useState<JobParams>({ job: {} } as JobParams);

  const { job, jobId } = props.location.state;

  useEffect(() => {
    getJobDetail();
  }, []);

  let getJobDetail = () => {
    axios
      .get(`${config.API_URL}/jobs/job-detail/${jobId}`)
      .then((result) => {
        setJob(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  //REFACTOR THIS BULLSHIT
  const categoryConversion = (category) => {
    switch (category) {
      case "job_saved":
        return "Saved";

      case "applied":
        return "Applied";

      case "incontact":
        return "In Contact";

      case "interview_1":
        return "Interview 1";

      case "interview_2":
        return "Interview 2";

      case "interview_3":
        return "Interview 3";

      case "hired":
        return "Hired";

      case "denied":
        return "Denied";

      case "archived":
        return "Archived";
    }
  };

  return (
    <CardContent jobModal paddingTop overflow>
      <CardContent>
        <HeaderMain noPadding>
          <strong>{job.company_name}</strong>
        </HeaderMain>

        <HeaderSecondary>{job.job_title}</HeaderSecondary>
        <p>Category: {categoryConversion(job.job_category)}</p>
      </CardContent>

      <NavLinks spaceAround backgroundColor>
        <NavItem
          primary
          jobDetailPage
          jobDetailActive={page === "overview"}
          onClick={() => setPage("overview")}
          style={{ color: page === "overview" ? "black" : "white" }}
        >
          Job Overview
        </NavItem>
        <NavItem
          primary
          jobDetailPage
          jobDetailActive={page === "contacts"}
          role="button"
          onClick={() => setPage("contacts")}
          style={{ color: page === "contacts" ? "black" : "white" }}
        >
          Job Contacts
        </NavItem>
        <NavItem
          primary
          jobDetailPage
          jobDetailActive={page === "tasks"}
          role="button"
          onClick={() => setPage("tasks")}
          style={{ color: page === "tasks" ? "black" : "white" }}
        >
          Job Tasks
        </NavItem>
        <NavItem
          primary
          jobDetailPage
          jobDetailActive={page === "notes"}
          role="button"
          onClick={() => setPage("notes")}
          style={{ color: page === "notes" ? "black" : "white" }}
        >
          Job Notes
        </NavItem>
      </NavLinks>

      {page === "overview" ? (
        <JobOverview {...jobState} getJob={getJobDetail} />
      ) : null}
      {page === "contacts" ? (
        <JobContacts job={jobState} getJob={getJobDetail} />
      ) : null}
      {page === "tasks" ? (
        <JobTasks job={jobState} getJob={getJobDetail} />
      ) : null}
      {page === "notes" ? (
        <JobNotes getJob={getJobDetail} job={jobState} />
      ) : null}
    </CardContent>
  );
};

export default JobNav;
