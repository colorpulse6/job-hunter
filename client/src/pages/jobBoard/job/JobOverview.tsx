import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../../config";
import { formatDate } from "../../../javascript/DateFunctions";
import Modal from "../../../components/Modal";
import AddChallenge from "../../tasks/challenges/AddChallenge";
import { TaskContext } from "../../../context/TaskContext";

import {
  PageContainer,
  Card,
  Flex,
} from "../../../styles/styled-components/StyledContainers";
import { StyledTextField } from "../../../styles/styled-components/StyledElements";

import { TinyText } from "../../../styles/styled-components/StyledText";

import Form from "../../../components/Form";
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
        props.getJob();
        // console.log(job_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editJobDates = (e, job_id, name) => {
    let key = name
    
    let value = e;
    // console.log(name)
    // console.log(key)
    // console.log(value)
    // console.log(key, value)
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
        <div>
          <Flex spaceBetween jobOverview>
            <Form
              noSubmit
              smallText
              onChange={editJob}
              inputs={[
                {
                  label: "Posting URL",
                  type: "text",
                  id: props.job_id,
                  name: "post_url",
                  required: false,
                  value: props.post_url,
                },
                {
                  label: "Company URL",
                  type: "text",
                  id: props.job_id,
                  name: "company_url",
                  required: false,
                  value: props.company_url,
                },
                {
                  label: "Location",
                  type: "text",
                  id: props.job_id,
                  name: "location",
                  required: false,
                  value: props.location,
                },
                {
                  label: "Salary",
                  type: "text",
                  id: props.job_id,
                  name: "salary",
                  required: false,
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
              inputs={[
                {
                  label: "Applied",
                  type: "text",
                  id: props.job_id,
                  name: "date_applied",
                  required: false,
                  value: formatDate(props.date_applied),
                },
                {
                  label: "Interview 1",
                  type: "text",
                  id: props.job_id,
                  name: "interview1",
                  required: false,
                  value: props.interview1 ? formatDate(props.interview1) : "-",
                },
                {
                  label: "Interview 2",
                  type: "text",
                  id: props.job_id,
                  name: "interview2",
                  required: false,
                  value: props.interview2 ? formatDate(props.interview2) : "-",
                },
                 
              
              ]}
            />
            {!noChallenge ? <Form 
            noSubmit
            smallText
            onChange={editJob}
            inputs= {[{
              label: "Challenge",
              type: "text",
              id: props.job_id,
              name: "challenge",
              required: false,
              value: props.challenge ? props.challenge : "",
            },]}
            /> : null}
            {noChallenge ? (
              <Modal
                jobChallenge
                challenge={props.challenge}
                onChange={editJob}
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
            ) : null}
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
          ></StyledTextField>
        </div>
      }
    </PageContainer>
  );
};

export default JobOverview;
