import React, { useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { formatDate } from "../../../javascript/DateFunctions";

import {
  PageContainer,
  Card,
  Flex,
} from "../../../styles/styled-components/StyledContainers";
import { StyledTextField } from "../../../styles/styled-components/StyledElements";

import { HeaderSecondary } from "../../../styles/styled-components/StyledText";

import Form from "../../../components/Form";
const JobOverview = (props) => {
  console.log(props);
  const editJob = (e, job_id) => {
    let key = e.target.name;
    let value = e.target.value;
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
    console.log(props.job_id);
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
              onChange={editJob}
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
                  value: props.interview1 ? formatDate(props.interview2): "-",
                },
                {
                  label: "Interview 2",
                  type: "text",
                  id: props.job_id,
                  name: "interview2",
                  required: false,
                  value: props.interview2 ? formatDate(props.interview2): "-",
                },
                {
                  label: "Challenge",
                  type: "text",
                  id: props.challenge,
                  name: "interview2",
                  required: false,
                  value: props.challenge ? formatDate(props.challenge): "-",
                },
              ]}
            />
          </Flex>
          <p
            style={{
              paddingTop: "30px",
              fontSize: "12px",
              color: "var(--color-primary)",
            }}
          >
            Job Description
          </p>
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
