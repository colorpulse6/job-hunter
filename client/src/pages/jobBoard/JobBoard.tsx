import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";
import { JobContext } from "../../context/JobContext";
import { JobColumnsStyled } from "../../styles/styled-components/StylesMain";

import { PageContainer } from "../../styles/styled-components/StyledContainers";

import JobCategory from "./JobCategory";

import Modal from "../../components/Modal";
import AddJob from "./AddJob";
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
  const [jobAdded, setJobAdded] = useState(false);
  const [jobList, setjobList] = useState([]);

  useEffect(() => {
    setJobAdded(false);
    setjobList([...jobState]);

    console.log(jobList);
  }, [jobState]);

  const handleStar = (e, job_id = null) => {
    e.preventDefault();
    if (e.target.checked) {
      if (e.target.id === "inputStar") {
        setInputStar(true);
      }
    }
    if (e.target.id === "renderStar") {
      if (renderStar === false) {
        setRenderStar(true);
      }
      if (renderStar === true) {
        setRenderStar(false);
      }
      changeStar(e, job_id);
    }
  };

  //Add Job
  const addJob = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let target = e.currentTarget as any;
    var values: IAddJob = {
      companyName: target.companyName.value,
      jobTitle: target.jobTitle.value,
      jobDescription: target.jobDescription.value,
    };
    const { companyName, jobTitle, jobDescription } = values;

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
        // console.log(result.data);
        setJobAdded(true);
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

  //Change Job Category
  const changeStatus = (category, job_id) => {
    let value = category;
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
        // console.log(jobState[index]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(jobState)

  //Change Star
  const changeStar = (e, job_id) => {
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

  //Search Jobs

  const onJobSearch = (e) => {
    e.preventDefault();
    var input = e.target.value;
    const filteredJobs = jobState.filter((job) => {
      return job.company_name.toLowerCase().includes(input.toLowerCase());
    });
    setjobList(filteredJobs);
    if (!input) {
      setjobList([...jobState]);
    }
  };

  return (
    <PageContainer column>
      <Modal
        addJobPlus
        width={500}
        height="100%"
        content={<AddJob addJob={addJob} handleStar={handleStar} />}
        title="Add Job"
        toggleOn={jobAdded}
      />
      <input
        style={{
          position: "absolute",
          right: 25,
          top: 78,
          width: "250px",
          padding: "5px",
          height: "20px",
          borderRadius: "5px",
        }}
        onChange={onJobSearch}
        placeholder="Search jobs by company..."
        type="text"
        id="jobs"
        name="jobs"
      />
      <JobColumnsStyled>
        <JobCategory
          changeStatus={changeStatus}
          handleStar={handleStar}
          removeJob={removeJob}
          jobAdded={jobAdded}
          addJob={addJob}
          toggleOn={jobAdded}
          filteredJobList={jobList}
          jobs={jobList}
        />
      </JobColumnsStyled>
    </PageContainer>
  );
}
