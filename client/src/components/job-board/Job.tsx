import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

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

import { TinyText } from "../../styles/styled-components/StylesMain";
const Job = ({ job, handleStar, category, removeJob, index, jobId }) => {
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
          <JobHeader>
            <div>
              <Link to={`/job-board/${job.job_id}`}>
                <JobTitle>
                  <strong>{job.company_name}</strong>
                </JobTitle>
              </Link>
              <p>{job.job_title}</p>
            </div>

            <input
              className={
                job.star ? "fa fa-star star fa-border" : "fa fa-star-o no-star"
              }
              type="checkbox"
              id="renderStar"
              checked={job.star ? true : false}
              onChange={(e) => handleStar(e, job.job_id)}
            />
          </JobHeader>
          <CardFooter>
            <CardContent>
              {openTasks ? (
                <CardItem right>
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
          </CardFooter>

          <button onClick={() => removeJob(job.job_id)}>x</button>
        </JobCard>
      )}
    </Draggable>
  );
};

export default Job;
