import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import contactIcon from "../../assets/contacts-icon.png";
import taskIcon from "../../assets/task-icon.png";
import notesIcon from "../../assets/notes-icon.png";

import Modal from "../../components/Modal";
import AddJob from "./AddJob";

import { getDaysAgo } from "../../javascript/DateFunctions";
import JobNav from "../../pages/jobBoard/JobNav";
import {
  JobCard,
  CountCircle,
} from "../../styles/styled-components/StylesCard";
import { RouteComponentProps } from "react-router-dom";
import {
  Card,
  Flex,
  CardFooter,
} from "../../styles/styled-components/StyledContainers";
import {
  TinyText,
  HeaderSecondary,
} from "../../styles/styled-components/StyledText";
import { StyledIcon } from "../../styles/styled-components/StyledElements";
import JobContacts from "./job/JobContacts"

import { ModalContainer, ModalRoute } from "react-router-modal";
import { BrowserRouter } from "react-router-dom";
import "react-router-modal/css/react-router-modal.css";
type TParams = {
  jobId: string;
};

const Job = (
  { job, handleStar, category, removeJob, index, jobId },
  { match }: RouteComponentProps<TParams>
) => {
  // console.log(jobId)
  const [openTasks, setOpenTasks] = useState(false);

  useEffect(() => {
    if (job.job_tasks) {
      setOpen();
    }
  }, [job.job_tasks]);

  const setOpen = () => {
    job.job_tasks.map((task) => {
      if (!task.completed) {
        setOpenTasks(true);
      } else {
        return <p>No Open Tasks</p>;
      }
    });
  };

  

  return (
    <Draggable draggableId={jobId} index={index}>
      {(provided, snapshot) => (
        <JobCard
          {...provided.draggableProps}
          //Determines what part is draggable (whole thing)
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div>
         
          <BrowserRouter>
              <div >

                <Link
                  to={{
                    pathname: `/job-board/job/${job.job_id}`,
                    state: { job: job, jobId: job.job_id },
                  }}
                >
                  {
                    <div>
                      <HeaderSecondary smallFont>
                        <strong>{job.company_name}</strong>
                      </HeaderSecondary>

                      <HeaderSecondary smallFont>
                        {job.job_title}
                      </HeaderSecondary>
                    </div>
                  }
                </Link>

                <ModalRoute
                  component={JobNav}
                  path="/job-board/job/:jobId"
                  parentPath="/job-board"
                />
                <ModalRoute
                  component={JobContacts}
                  path="/job-board/:jobId/job-contacts"
                  parentPath="/job-board"
                />
              </div>

              </BrowserRouter>
     

            <Flex column>
              <input
                className={
                  job.star
                    ? "fa fa-star star fa-border"
                    : "fa fa-star-o no-star"
                }
                type="checkbox"
                id="renderStar"
                checked={job.star ? true : false}
                onChange={(e) => handleStar(e, job.job_id)}
              />

              {openTasks ? (
                <Flex spaceAround>
                  <TinyText job>Job Tasks Open</TinyText>
                  <CountCircle red small />
                </Flex>
              ) : (
                <Flex spaceAround>
                  <TinyText job>No Job Tasks Open</TinyText>

                  <CountCircle green small />
                </Flex>
              )}
            </Flex>
          </div>
          <CardFooter background padding flex spaceAround>
          <Link
                  to={{
                    pathname: `/job-board/${job.job_id}/job-contacts`,
                    state: { job: job, jobId: job.job_id },
                  }}
                ><StyledIcon small src={contactIcon}></StyledIcon></Link>
            <StyledIcon small src={taskIcon}></StyledIcon>
            <StyledIcon small src={notesIcon}></StyledIcon>
            <TinyText addedDate>
              Added {getDaysAgo(job.date_added)} Days Ago
            </TinyText>
          </CardFooter>

          {/* <button onClick={() => removeJob(job.job_id)}>x</button> */}
        </JobCard>
      )}
    </Draggable>
  );
};

export default Job;
