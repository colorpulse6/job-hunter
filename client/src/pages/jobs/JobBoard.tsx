import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";
import { JobContext } from "../../context/JobContext";

interface IAddJob {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
}

export default function JobBoard(): JSX.Element {
  const jobContext = useContext(JobContext);

  const { jobState, getJobs } = jobContext;

  const [inputStar, setInputStar] = useState(false);
  const [renderStar, setRenderStar] = useState(false);


  console.log(jobState);
  const handleStar = (e, job_id=null) => {
    e.preventDefault()
    if(e.target.checked){
      if(e.target.id === "inputStar"){
        setInputStar(true);
      } 
      
    }
    if(e.target.id === "renderStar"){
      if(renderStar === false){
        setRenderStar(true);

      }  if (renderStar === true){
        setRenderStar(false);
      }
      changeStar(e, job_id)
    }
    
  };

  const addJob = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let target = e.currentTarget as any;
    var values: IAddJob = {
      companyName: target.companyName.value,
      jobTitle: target.jobTitle.value,
      jobDescription: target.jobDescription.value,
    };
    const { companyName, jobTitle, jobDescription } = values;

    //Add Job
    axios
      .post(
        `${config.API_URL}/job-board/add-job`,
        {
          companyName,
          jobTitle,
          jobDescription,
          inputStar,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getJobs();
        Array.from(document.querySelectorAll("input")).forEach((input) => {
          input.value = "";
          if (input.type === "checkbox" && input.id === "inputStar") {
            input.checked = false;
          }
        });
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  //Remove Job
  const removeJob = (job_id) => {
    console.log("in client");
    axios
      .post(
        `${config.API_URL}/job-board/delete-job`,
        {
          job_id,
        },
        { withCredentials: true }
      )
      .then(() => {
        getJobs();
        // console.log(job_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Change Job Category
  const changeStatus = (e, index, job_id) => {
    console.log(index);
    console.log(e.target.value);
    let value = e.target.value;
    axios
      .post(
        `${config.API_URL}/job-board/set-status`,
        {
          value,
          job_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        getJobs();
        console.log(jobState[index]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Change Star
  const changeStar =  (e, job_id) => {
     console.log(renderStar);
    axios
      .post(
        `${config.API_URL}/job-board/set-star`,
        {
          renderStar,
          job_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        getJobs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Add Job</h1>
      <form onSubmit={(e) => addJob(e)}>
        <div>
          <input
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Company Name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            placeholder="Job Title"
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="jobDescription"
            name="jobDescription"
            placeholder="Description"
          />
        </div>
        <div>
          <input type="checkbox" id="inputStar" onChange={handleStar} />
          <p>Star Job?</p>
        </div>

        <div>
          <input type="submit" value="Add Job" />
        </div>
      </form>

      {jobState
        .sort((a, b) => a.job_id - b.job_id)
        .map((job, index) => {
          return (
            <div key={index}>
              <Link to={`/job-board/${job.job_id}`}>
                <p>{job.company_name}</p>
              </Link>
              <div>
                <input type="checkbox" id="renderStar" checked={job.star ? true : false} onChange={(e)=>handleStar(e, job.job_id)} />
                <p>Star Job?</p>
              </div>
              <p>
                Category:{" "}
                {Object.keys(job).find(
                  (key) => job[key] === true && key !== "star"
                )}
              </p>

              <button onClick={() => removeJob(job.job_id)}>X</button>
              <button
                type="submit"
                value="applied"
                onClick={(e) => changeStatus(e, index, job.job_id)}
              >
                Add to Applied
              </button>
              <button
                type="submit"
                value="incontact"
                onClick={(e) => changeStatus(e, index, job.job_id)}
              >
                Set In Contact
              </button>
              <button
                type="submit"
                value="interview1"
                onClick={(e) => changeStatus(e, index, job.job_id)}
              >
                Add to Interview 1
              </button>
              <button
                type="submit"
                value="interview2"
                onClick={(e) => changeStatus(e, index, job.job_id)}
              >
                Add to Interview 2
              </button>
              <button
                type="submit"
                value="interview3"
                onClick={(e) => changeStatus(e, index, job.job_id)}
              >
                Add to Interview 3
              </button>
              <button
                type="submit"
                value="hired"
                onClick={(e) => changeStatus(e, index, job.job_id)}
              >
                Add to Hired
              </button>
              <button
                type="submit"
                value="denied"
                onClick={(e) => changeStatus(e, index, job.job_id)}
              >
                Add to Denied
              </button>
              <button
                type="submit"
                value="archived"
                onClick={(e) => changeStatus(e, index, job.job_id)}
              >
                Add to Archived
              </button>
            </div>
          );
        })}
    </>
  );
}
