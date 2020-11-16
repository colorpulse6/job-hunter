import React, { useContext } from "react";
import { JobContext } from "../../context/JobContext";
import Job from "./Job";
import { Droppable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  DropContainer,
  JobCard,
  JobHeader,
  CardFooter,
  JobTitle,
} from "../../styles/styled-components/StylesCard";

import { HeaderMain } from "../../styles/styled-components/StylesMain";

const JobColumn = (props) => {
  const jobContext = useContext(JobContext);
  const { jobState, jobsSaved, jobsApplied, jobsInterviewing } = jobContext;
  const { title, category } = props.column;
  console.log(jobState);
  return (
    <>
      <Card jobCategory>
        <CardContent jobCategory>
          <HeaderMain mediumFont centerText>
            {title}
    <p>       
  {jobState.reduce((acc, curr)=>{

    
      return acc + (curr.job_category === category);
  

  }, 0)} Jobs</p>
          </HeaderMain>

          <Droppable droppableId={props.column.id}>
            {(provided, snapshot) => (
              <DropContainer
                //See documentation for all props
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.jobs.map((job, index) => {
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
              </DropContainer>
            )}
          </Droppable>
        </CardContent>
      </Card>
    </>
  );
};

export default JobColumn;
