import React, { useContext } from "react";
import { JobContext } from "../../../context/JobContext";
import { withRouter } from "react-router-dom";
import { PageContainer } from "../../../styles/styled-components/StyledContainers";
import Form from "../../../components/Form";
const JobOverview = (props) => {
  const { job_description } = props;
  return (
    <PageContainer>
      {
        <div>
          <Form
            noSubmit
            smallText
            inputs={[
              {
                label: "Posting URL",
                type: "text",
                id: "posting_url",
                name: "posting_url",
                required: false,
              },
              {
                label: "Company URL",
                type: "text",
                id: "Company_url",
                name: "Company_url",
                required: false,
              },
            ]}
          />
          <p>Job Description: {job_description}</p>
        </div>
      }
    </PageContainer>
  );
};

export default JobOverview;
