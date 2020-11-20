import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import contactIcon from "../../assets/contacts-icon.png";
import Modal from "../../components/Modal";
import AddJob from "../../components/job-board/AddJob";

import JobNav from "../../pages/jobs/JobNav";
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
import { RouteComponentProps } from "react-router-dom";

import {
  TinyText,
} from "../../styles/styled-components/StylesMain";
import {
  StyledIcon
} from "../../styles/styled-components/StyledElements";
type TParams = {
  jobId: string;
};

const Job = (
  { job, handleStar, category, removeJob, index, jobId },
  { match }: RouteComponentProps<TParams>
) => {
  // console.log(jobId)
  const [openTasks, setOpenTasks] = useState(false);
  const [modal, activateModal] = useState(false)

  useEffect(() => {
    if (job.job_tasks) {
      setOpen();
    }
  }, [job.job_tasks]);
  console.log(job)
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
          <JobHeader squish>

            {/* <Link to ={`/job-board/job/${job.job_id}`}> */}
            <Modal
            jobDetail
            job={job}
            content={
              <JobNav job={job} jobId={job.job_id} />
            }
            title="Add Job"
            toggleOn={false}
          />
          
            {/* </Link> */}
         
           
            <CardContent noBackground>
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
                <CardItem>
                  <TinyText>Job Tasks Open</TinyText>
                  <CountCircle red small />
                </CardItem>
              ) : (
                <CardItem right>
                  <TinyText>No Job Tasks Open</TinyText>

                  <CountCircle green small />
                </CardItem>
              )}
            </CardContent>
          </JobHeader>
          <CardFooter>
            <StyledIcon small src={contactIcon}></StyledIcon>
          </CardFooter>

          {/* <button onClick={() => removeJob(job.job_id)}>x</button> */}
        </JobCard>
      )}
    </Draggable>
  );
};

export default Job;
