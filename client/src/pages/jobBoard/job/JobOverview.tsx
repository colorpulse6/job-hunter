import React, { useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { PageContainer } from "../../../styles/styled-components/StyledContainers";
import Form from "../../../components/Form";
const JobOverview = (props) => {
console.log(props)
  const editJob = (e, job_id) => {
    let key = e.target.name
    let value = e.target.value
    axios
      .post(
        `${config.API_URL}/job-board/edit-job`,
        {
          key,
          value,
          job_id
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
    console.log(props.job_id)
  };
  return (
    <PageContainer>
      {
        <div>
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
                value: props.post_url
              },
              {
                label: "Company URL",
                type: "text",
                id: props.job_id,
                name: "company_url",
                required: false,
                value: props.company_url

              },
            ]}
          />
          <p>Job Description: {props.job_description}</p>
        </div>
      }
    </PageContainer>
  );
};

export default JobOverview;
