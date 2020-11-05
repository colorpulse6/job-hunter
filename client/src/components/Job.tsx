import React from "react";
import { Link } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";

import {
  Card,
  CardContent,
  JobCard,
  JobHeader,
  CardFooter,
  JobTitle,
} from "../styles/styled-components/StylesCard";

const Job = ({ job, handleStar, category, removeJob, index, jobId }) => {
  console.log(jobId)
    return (
    <Draggable  draggableId={jobId} index={index}>
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
              Job Tasks:{" "}
              {job.job_tasks ? (
                <Link to={`/job-board/${job.job_id}`}>Open</Link>
              ) : (
                "No Open Tasks"
              )}
            </CardContent>
          </CardFooter>
          {category === "archived" ? (
            <button onClick={() => removeJob(job.job_id)}>x</button>
          ) : null}
        </JobCard>
      )}
    </Draggable>
  );
};

export default Job;
