import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../config";
import { formatDate } from "../../../javascript/DateFunctions";
import Modal from "../../../components/Modal";
import AddChallenge from "../../tasks/challenges/AddChallenge";
import { TaskContext } from "../../../context/TaskContext";
import { axiosPost } from "../../../javascript/fetchFunctions";

import {
  PageContainer,
  Card,
  Flex,
} from "../../../styles/styled-components/StyledContainers";
import { StyledTextField } from "../../../styles/styled-components/StyledElements";

import { TinyText } from "../../../styles/styled-components/StyledText";

import Form from "../../../components/Form";
import { isPropertyDeclaration } from "typescript";
const JobOverview = (props) => {
  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;
  const [noChallenge, setNoChallenge] = useState(true);
  const [challengeAdded, setChallengeAdded] = useState(false);


  useEffect(() => {
    if (props.challenge) {
      setNoChallenge(false);
    }
    if (props.challenge === ""){
      setNoChallenge(true);

    }
    props.getJob()
  });

  const editJob = (e, job_id) => {
    let key = e.target.name;
    let value = e.target.value;
    console.log(key, value)
    axios
      .post(
        `${config.API_URL}/job-board/edit-job`,
        {
          key,
          value,
          job_id,
        },
        { withCredentials: true }
      )
      .then(() => {
        // console.log(job_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editJobDates = (e, job_id, name) => {
    let key = name
    let value = e;
    
    axios
      .post(
        `${config.API_URL}/job-board/edit-job`,
        {
          key,
          value,
          job_id,
        },
        { withCredentials: true }
      )
      .then(() => {
        props.getJob();
        console.log(props);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const removeEdits = (e, key, job_id) => {
    let value = ""
    console.log(key, job_id)
    axios
      .post(
        `${config.API_URL}/job-board/edit-job`,
        {
          key,
          value,
          job_id,
        },
        { withCredentials: true }
      )
      .then(() => {
        props.getJob();
        console.log(props);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  return (
    <PageContainer>
      {
        <>
          <Flex spaceBetween jobOverview>
            <Form
              noSubmit
              smallText
              onChange={(e)=>editJob(e, props.job_id)}
              inputs={[
                {
                  label: "Posting URL",
                  type: "text",
                  id: "post_url",
                  name: "post_url",
                  required: true,
                  value: props.post_url,
                },
                {
                  label: "Company URL",
                  type: "text",
                  id: "company_url",
                  name: "company_url",
                  required: true,
                  value: props.company_url,
                },
                {
                  label: "Location",
                  type: "text",
                  id: "location",
                  name: "location",
                  required: true,
                  value: props.location,
                },
                {
                  label: "Salary",
                  type: "text",
                  id: "salary",
                  name: "salary",
                  required: true,
                  value: props.salary,
                },
              ]}
            />
            <Form
              noSubmit
              smallText
              addDate
              onChange={editJob}
              editJobDates={editJobDates}
              removeEdits={removeEdits}
              putButton
              jobId={props.job_id}
              inputs={[
                {
                  label: "Applied",
                  type: "text",
                  id: "date_applied",
                  name: "date_applied",
                  required: true,
                  value: props.date_applied ? formatDate(props.date_applied) : props.date_applied,
                },
                {
                  label: "Interview 1",
                  type: "text",
                  id: "Interview 1",
                  name: "interview1",
                  required: true,
                  value: props.interview1 ? formatDate(props.interview1) : props.interview1,
                },
                {
                  label: "Interview 2",
                  type: "text",
                  id: "Interview 2",
                  name: "interview2",
                  required: true,
                  value: props.interview2 ? formatDate(props.interview2) : props.interview2,
                }
                            
              ]}
            />
          
            
              <Modal
                jobChallenge
                challenge={props.challenge}
                onChange={editJob}
                removeEdits={removeEdits}
                job_id={props.job_id}
                content={
                  <AddChallenge
                    challengeAdded={challengeAdded}
                    setChallengeAdded={setChallengeAdded}
                    getTasks={getTasks}
                    getJob={props.getJob}
                    jobChallengeCheck
                    jobId={props.job_id}
                    jobChallengeTitle = {props.job_title}
                    jobChallengeCompany = {props.company_name}
                  />
                }
                toggleOn={challengeAdded}
              />
              
            
          </Flex>
          <Flex>
            <p
              style={{
                paddingTop: "30px",
                fontSize: "12px",
                color: "var(--color-primary)",
              }}
            >
              Job Description
            </p>
            <Link
              to="/tasks/challenges"
              style={{
                paddingTop: "25px",
              }}
            >
              <TinyText>Go to Challenges</TinyText>
            </Link>
          </Flex>

          <StyledTextField
            value={props.job_description}
            name="job_description"
            onChange={(e) => editJob(e, props.job_id)}

          />
        </>
      }
    </PageContainer>
  );
};

export default JobOverview;
