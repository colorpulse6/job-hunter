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
import { TinyText } from "../../styles/styled-components/StyledText";
import { StyledIcon } from "../../styles/styled-components/StyledElements";

type TParams = {
  jobId: string;
};

const Job = (
  { job, handleStar, category, removeJob, index, jobId },
  { match }: RouteComponentProps<TParams>
) => {
  // console.log(jobId)
  const [openTasks, setOpenTasks] = useState(false);
  const [modal, activateModal] = useState(false);

  useEffect(() => {
    if (job.job_tasks) {
      setOpen();
    }
  }, [job.job_tasks]);
  console.log(job);
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
            {/* <Link to ={`/job-board/job/${job.job_id}`}> */}
            <Modal
              jobDetail
              job={job}
              content={<JobNav job={job} jobId={job.job_id} />}
              title="Add Job"
              toggleOn={false}
            />

            {/* </Link> */}

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
            <StyledIcon small src={contactIcon}></StyledIcon>
            <StyledIcon small src={taskIcon}></StyledIcon>
            <StyledIcon small src={notesIcon}></StyledIcon>
            <TinyText addedDate>Added {getDaysAgo(job.date_added)} Days Ago</TinyText>
          </CardFooter>

          {/* <button onClick={() => removeJob(job.job_id)}>x</button> */}
        </JobCard>
      )}
    </Draggable>
  );
};

export default Job;
