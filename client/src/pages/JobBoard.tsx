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
        // console.log(result.data);
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

      {jobState.map((job, index) => {
        return (
          <div key={index}>
            <p>{job.company_name}</p>
            <button onClick={() => removeJob(job.job_id)}>X</button>
          </div>
        );
      })}
    </>
  );
}
