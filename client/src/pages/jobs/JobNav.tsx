import React, { useState, useEffect, useContext } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import JobOverview from "./JobOverview";
import JobContacts from "./JobContacts";
import JobTasks from "./JobTasks";
import JobNotes from "./JobNotes";
import { JobParams } from "../../interfaces"
import { JobContext } from "../../context/JobContext";
import { NavLink } from "react-router-dom";
import { NavContainer, NavLinks, NavItem } from "../../styles/styled-components/StylesNavbar"
import NavStyles from "../../styles/secondaryNav.module.scss";
import Rodal from "rodal";
import 'rodal/lib/rodal.css';
import {
  Card,
  CardContent,
  JobCard,
  JobHeader,
  CardFooter,
  JobTitle,
  CountCircle,
  CardItem,
} from "../../styles/styled-components/StylesCard";

type TParams = {
  jobId: string;
  
};

// { match }: RouteComponentProps<TParams>
// const jobId = props.match.params.jobId;

const JobNav = (props) => {
  // const jobContext = useContext(JobContext);
  // const { jobDetail, getJobDetail } = jobContext;

  const [page, setPage] = useState("overview");
  const [job, setJob] = useState<JobParams>({job:{}} as JobParams);
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };
  const jobId = props.jobId;

 
 

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
  }
  

  return (
   <>
   <CardContent jobDetailPage >
     <JobTitle mediumFont jobDetailPage><strong>{props.job.company_name}</strong></JobTitle>

  <JobTitle mediumFont title>{props.job.job_title}</JobTitle>
  <p>
            Category:{" "}
            {Object.keys(props.job).find((key) => props.job[key] === true)}
          </p>
  </CardContent>
    <NavContainer jobDetailPage>
      <NavLinks jobDetailPage>
      <NavItem primary jobDetailPage jobDetailActive={page==="overview"} onClick={() => setPage("overview")}>Job Overview</NavItem>
      <NavItem primary jobDetailPage jobDetailActive={page==="contacts"} role="button" onClick={() => setPage("contacts")}>Job Contacts</NavItem>
      <NavItem primary jobDetailPage jobDetailActive={page==="tasks"} role="button" onClick={() => setPage("tasks")}>Job Tasks</NavItem>
      <NavItem primary jobDetailPage jobDetailActive={page==="notes"} role="button" onClick={() => setPage("notes")}>Job Notes</NavItem>
      </NavLinks>
      </NavContainer>
      {page === "overview" ? <JobOverview {...job} /> : null}
      {page === "contacts" ? <JobContacts job={job} getJob={getJobDetail} /> : null}
      {page === "tasks" ? <JobTasks job={job} getJob={getJobDetail}/> : null}
      {page === "notes" ? <JobNotes job={job}/> : null}
  </>
    
 
      
    
    
    // <NavContainer>
    //   <NavLinks>
        
        
    //     <NavLink to={`/job-board/${jobId}/job-overview`} activeClassName={NavStyles.activeNav}>
    //     <NavItem> Overview</NavItem> 
    //     </NavLink>
    //     <NavLink to={`/job-board/${jobId}/job-contacts`} activeClassName={NavStyles.activeNav}>
          
    //     <NavItem>Contacts</NavItem> 
    //     </NavLink>
    //     <NavLink
    //       to={{ pathname: `/job-board/${jobId}/job-tasks` }}
          
    //       activeClassName={NavStyles.activeNav}
    //     >
    //       <NavItem>Tasks</NavItem> 
    //     </NavLink>
    //     <NavLink
    //       to={{ pathname: `/job-board/${jobId}/job-notes`}}
          
    //       activeClassName={NavStyles.activeNav}
    //     >
    //       <NavItem>Notes</NavItem> 
    //     </NavLink>
    //   </NavLinks>
    // </NavContainer>
  );
};

export default JobNav
