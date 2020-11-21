import React, { useContext } from "react";
import { JobContext } from "../../context/JobContext";
import Job from "./Job";
import Modal from "../../components/Modal";
import AddJob from "../../components/job-board/AddJob";

import { Droppable } from "react-beautiful-dnd";
import { CardContainer } from "../../styles/styled-components/StyledContainers";
import {
  CardContent,
  DropContainer,
  CountCircle,
} from "../../styles/styled-components/StylesCard";


import { HeaderMain } from "../../styles/styled-components/StylesMain";

const JobColumn = (props) => {
  const jobContext = useContext(JobContext);
  const { jobState, getJobs } = jobContext;
  const { title, category } = props.column;
  console.log(jobState);

  return (
    <>
      <CardContainer>
        <CardContent jobCategory columnHeader>
          <HeaderMain mediumFont centerText removeBottom>
            {title}
            <CountCircle counter>
              {jobState.reduce((acc, curr) => {
                return acc + (curr.job_category === category);
              }, 0)}{" "}
            </CountCircle>
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
          <Modal
            addJobColumn
            
            content={
              <AddJob addJob={props.addJob} handleStar={props.handleStar} />
            }
            title="Add Job"
            toggleOn={props.toggleOn}
          />
        </CardContent>
      </CardContainer>
    </>
  );
};

export default JobColumn;
