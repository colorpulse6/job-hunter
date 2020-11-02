import React, { useContext } from "react";
import { Card, CardContent } from "../styles/styled-components/StylesCard";
import { JobContext } from "../context/JobContext";

const JobCategory = (props) => {
  const jobContext = useContext(JobContext);
  const { jobState } = jobContext;
  const { drop, allowDrop, drag, title, id1, id2, category } = props;
console.log(jobState)

  return (
    <>
      <div id={id1} onDrop={drop} onDragOver={allowDrop}>
        <h5>{title}</h5>
        {jobState.map((job, index) => {
          if (job[category] !== null) {
            return (
              <CardContent key={index} id={id2} draggable="true" onDragStart={(e)=>drag(e, index, job.job_id, category)}>
                {job.company_name}
              </CardContent>
            );
          }
        })}
      </div>
    </>
  );
};

export default JobCategory;
