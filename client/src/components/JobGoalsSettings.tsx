import React from "react";
import {
  CardContainer,
  Card,
  CardContent,
  Flex
} from "../styles/styled-components/StyledContainers";
import Form from "../components/Form";
const JobGoalsSettings = (props) => {
  const { goalsDaily, goalsWeekly, goalsMonthly, column, handleChange } = props;

  return (
    <div style={{marginLeft:"170px"}}>
    <Form
      smallText
      noSubmit
      goalInput
      onChange={handleChange}
      inputs={[
        {
          type: "number",
          id: column + "daily",
          name: column + "daily",
          label: "Daily",
          value: goalsDaily || null,
          required: true,
        },
        {
          type: "number",
          id: column + "weekly",
          name: column + "weekly",
          label: "Weekly",
          value: goalsWeekly || null,
          required: true,
        },
        {
          type: "number",
          id: column + "monthly",
          name: column + "monthly",
          label: "Monthly",
          value: goalsMonthly || null,
          required: true,
        },
      ]}
    />
</div>
  );
};

export default JobGoalsSettings;
