import React, { useContext } from "react";
import {
  Card,
  CardContent,
  JobCard,
  JobHeader,
} from "../styles/styled-components/StylesCard";
import { JobContext } from "../context/JobContext";
import { Link } from "react-router-dom";

const JobCategory = (props) => {
  const jobContext = useContext(JobContext);
  const { jobState } = jobContext;
  const {
    drop,
    allowDrop,
    drag,
    removeJob,
    handleStar,
    title,
    id1,
    id2,
    category,
  } = props;
  console.log(category);

  return (
    <>
     <Card jobCategory id={id1} onDrop={drop} onDragOver={allowDrop}>
        <CardContent>
          <h5>{title}</h5>
          {jobState.map((job, index) => {
            if (job[category] !== null) {
              return (
                <div>
                  <JobCard
                    key={index}
                    id={id2}
                    draggable="true"
                    onDragStart={(e) => drag(e, index, job.job_id, category)}
                  >
                    <JobHeader>
                      <p>
                        <strong>{job.company_name}</strong>
                      </p>
                      <p>{job.job_title}</p>
                    </JobHeader>
                    <div>
                      <div>
                        
                        <input
                        className={job.star ? "fa fa-star star fa-border" : "fa fa-star-o no-star"}
                          type="checkbox"
                          id="renderStar"
                          checked={job.star ? true : false}
                          onChange={(e) => handleStar(e, job.job_id)}
                        />
                        
                      </div>
                      <p>
                        Job Tasks:{" "}
                        {job.job_tasks ? (
                          <Link to={`/job-board/${job.job_id}`}>Open</Link>
                        ) : (
                          "No Open Tasks"
                        )}
                      </p>
                    </div>
                  </JobCard>
                  {category === "archived" ? (
                    <button onClick={() => removeJob(job.job_id)}>x</button>
                  ) : null}
                </div>
              );
            }
          })}
        </CardContent>
      </Card>
    </>
  );
};

export default JobCategory;
