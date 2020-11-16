import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";
import { JobContext } from "../../context/JobContext";
import {
  PageContainer,
  JobColumnsStyled,
} from "../../styles/styled-components/StylesMain";
import JobCategory from "../../components/job-board/JobCategory";
import { Card, CardContent } from "../../styles/styled-components/StylesCard";

import Modal from "../../components/Modal";
import AddJob from "../../components/job-board/AddJob";
interface IAddJob {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
}

export default function JobBoard(): JSX.Element {
  const jobContext = useContext(JobContext);

  const { getJobs } = jobContext;

  const [inputStar, setInputStar] = useState(false);
  const [renderStar, setRenderStar] = useState(false);
  const [jobAdded, setJobAdded] = useState(false);

  useEffect(() => {
    setJobAdded(false);
    
  });

  useEffect(() => {
    getJobs();
    
  });
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

  return (
    <PageContainer column>
      <Modal
        addJob
        width={500}
        height="100%"
        content={<AddJob addJob={addJob} handleStar={handleStar} />}
        title="Add Job"
        toggleOn={jobAdded}
      ></Modal>

      <JobColumnsStyled>
        <JobCategory
          changeStatus={changeStatus}
          handleStar={handleStar}
          removeJob={removeJob}
          jobAdded={jobAdded}
        />
      </JobColumnsStyled>
    </PageContainer>
  );
}
