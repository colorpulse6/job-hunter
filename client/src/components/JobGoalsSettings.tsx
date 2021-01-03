import React from "react";
import {
  CardContainer,
  Card,
  CardContent,
} from "../styles/styled-components/StyledContainers";
import Form from "../components/Form";

const JobGoalsSettings = (props) => {
  const { goalsDaily, goalsWeekly, goalsMonthly, column, handleChange } = props;

  return (
    <Form
      smallText
      noSubmit
      onChange={handleChange}
      inputs={[
        {
          type: "number",
          id: column + "daily",
          name: column + "daily",
          label: "Daily",
          value: goalsDaily || null,
          required: false,
        },
        {
          type: "number",
          id: column + "weekly",
          name: column + "weekly",
          label: "Weekly",
          value: goalsWeekly || null,
          required: false,
        },
        {
          type: "number",
          id: column + "monthly",
          name: column + "monthly",
          label: "Monthly",
          value: goalsMonthly || null,
          required: false,
        },
      ]}
    />

  );
};

export default JobGoalsSettings;
