import React, { useState, useEffect, useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import JobOverview from "./JobOverview";
import JobContacts from "./JobContacts";
import JobTasks from "./JobTasks";
import JobNotes from "./JobNotes";
import { JobParams } from "../../interfaces";
import { JobContext } from "../../context/JobContext";
import { NavLink } from "react-router-dom";
import {
  NavContainer,
  NavLinks,
  NavItem,
} from "../../styles/styled-components/StylesNavbar";
import NavStyles from "../../styles/secondaryNav.module.scss";

type TParams = {
  jobId: string;
};

const JobDetails = ({ match }: RouteComponentProps<TParams>) => {
  const jobContext = useContext(JobContext);
  const { jobDetail, getJobDetail } = jobContext;

  const [page, setPage] = useState("");
  const [job, setJob] = useState<JobParams>({ job: {} } as JobParams);
  const jobId = match.params.jobId;

  useEffect(() => {
    getJobDetail(jobId);
  }, []);

  console.log(jobDetail);

  return (
    // <div>
    //   <button onClick={() => setPage("overview")}>Job Overview</button>
    //   <button onClick={() => setPage("contacts")}>Job Contacts</button>
    //   <button onClick={() => setPage("tasks")}>Job Tasks</button>
    //   <button onClick={() => setPage("notes")}>Job Notes</button>

    //   {page === "overview" ? <JobOverview {...job} /> : null}
    //   {page === "contacts" ? <JobContacts job={job} getJob={getJobDetail} /> : null}
    //   {page === "tasks" ? <JobTasks job={job} getJob={getJobDetail}/> : null}
    //   {page === "notes" ? <JobNotes job={job}/> : null}
    // </div>
    <NavContainer>
      <NavLinks>
        <NavLink
          to={`/job-board/${jobId}/job-overview`}
          activeClassName={NavStyles.activeNav}
        >
          <NavItem> Overview</NavItem>
        </NavLink>
        <NavLink
          to={`/job-board/${jobId}/job-contacts`}
          activeClassName={NavStyles.activeNav}
        >
          <NavItem>Contacts</NavItem>
        </NavLink>
        <NavLink
          to={{ pathname: `/job-board/${jobId}/job-tasks`, state: { jobId } }}
          activeClassName={NavStyles.activeNav}
        >
          <NavItem>Tasks</NavItem>
        </NavLink>
        <NavLink
          to={{ pathname: `/job-board/${jobId}/job-notes`, state: { jobId } }}
          activeClassName={NavStyles.activeNav}
        >
          <NavItem>Notes</NavItem>
        </NavLink>
      </NavLinks>
    </NavContainer>
  );
};

export default withRouter(JobDetails) as any;
