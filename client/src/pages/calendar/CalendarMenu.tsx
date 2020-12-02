import React from "react";
import {
  CardContainer,
  Card,
} from "../../styles/styled-components/StyledContainers";

import {
  HeaderMain,
  HeaderSecondary,
} from "../../styles/styled-components/StyledText";
const CalendarMenu = (props) => {
  const {
    saved_job_goals_daily,
    saved_job_goals_weekly,
    saved_job_goals_monthly,
    applied_job_goals_daily,
    applied_job_goals_weekly,
    applied_job_goals_monthly,
  } = props.authState;
  return (
    <div>
      <CardContainer shorter>
        <HeaderMain centerText>Goals</HeaderMain>

        <Card smallFont noBorder>
          <HeaderSecondary noPadding>Saved</HeaderSecondary>
          <p>Daily: {saved_job_goals_daily}</p>
          <p>Weekly: {saved_job_goals_weekly}</p>
          <p>Monthly: {saved_job_goals_monthly}</p>
        </Card>

        <Card smallFont noBorder>
          <HeaderSecondary noPadding>Applied</HeaderSecondary>
          <p> Daily: {applied_job_goals_daily}</p>
          <p> Weekly: {applied_job_goals_weekly}</p>
          <p> Monthly: {applied_job_goals_monthly}</p>
        </Card>
      </CardContainer>
    </div>
  );
};

export default CalendarMenu;
