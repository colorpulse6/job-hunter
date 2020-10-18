import React, { useContext } from "react";
import axios from "axios";
import config from "../config";
import { JobContext } from "../context/JobContext";

interface IAddJob {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
}

export default function JobBoard(): JSX.Element {
  const jobContext = useContext(JobContext);

  const { jobState, getJobs } = jobContext;

  console.log(jobState);

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
        },
        { withCredentials: true }
      )
      .then((result) => {
        getJobs();
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  //Remove Job
  const removeJob = (job_id) => {
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
          <input type="submit" value="Add Job" />
        </div>
      </form>

      {jobState
        .sort((a, b) => a.job_id - b.job_id)
        .map((job, index) => {
          return (
            <div key={index}>
              <p>{job.company_name}</p>
              <p>
                Category: {Object.keys(job).find((key) => job[key] === true)}
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
