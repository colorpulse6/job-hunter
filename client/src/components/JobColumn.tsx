import React, { useContext } from "react";
import { JobContext } from "../context/JobContext";
import Job from "./Job";
import { Droppable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  JobCard,
  JobHeader,
  CardFooter,
  JobTitle,
} from "../styles/styled-components/StylesCard";

const JobColumn = (props) => {
  const jobContext = useContext(JobContext);
  const { jobState } = jobContext;
  const { title, category } = props.column;
//   console.log(jobState);
  return (
    <>
      <Card jobCategory>
        <CardContent jobCategory>
          <h5>{title}</h5>

          <Droppable droppableId={props.column.id}>
            {(provided) => (
              <div
                //See documentation for all props
                ref={provided.innerRef} {...provided.droppableProps}
              >
                {jobState.map((job, index) => {
                  if (job)
                    return (
                      <Job
                        job={job}
                        handleStar={props.handleStar}
                        category={category}
                        removeJob={props.removeJob}
                        jobId={String(job.job_id)}
                        index={index}
                        key={job.job_id}
                      />
                    );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardContent>
      </Card>
    </>
  );
};

export default JobColumn;
