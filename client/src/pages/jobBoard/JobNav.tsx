import React, { useState, useEffect, useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
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

import "rodal/lib/rodal.css";
import {
  JobTitle,
} from "../../styles/styled-components/StylesCard";

import {
  CardContent,
} from "../../styles/styled-components/StyledContainers";

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
  const [job, setJob] = useState<JobParams>({ job: {} } as JobParams);
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };
  const jobId = props.location.state.jobId;

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

  return (
    <CardContent jobModal>
      <CardContent jobModal>
        <JobTitle mediumFont jobDetailPage>
          <strong>{props.location.state.job.company_name}</strong>
        </JobTitle>

        <JobTitle mediumFont title>
          {props.location.state.job.job_title}
        </JobTitle>
        <p>
          Category:{" "}
          {Object.keys(props.location.state.job).find((key) => props.location.state.job[key] === true)}
        </p>
      </CardContent>
      <NavContainer jobDetailPage>
        <NavLinks jobDetailPage>
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
      </NavContainer>
      {page === "overview" ? <JobOverview {...job} /> : null}
      {page === "contacts" ? (
        <JobContacts job={job} getJob={getJobDetail} />
      ) : null}
      {page === "tasks" ? <JobTasks job={job} getJob={getJobDetail} /> : null}
      {page === "notes" ? <JobNotes job={job} /> : null}
    </CardContent>

  );
};

export default JobNav;
