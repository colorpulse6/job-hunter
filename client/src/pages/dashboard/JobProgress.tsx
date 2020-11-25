import React from "react";

import {
  CardContainer,
  Card,
  CardContent,
} from "../../styles/styled-components/StyledContainers";

import {
  HeaderMain,
  FooterMain,
} from "../../styles/styled-components/StyledText";

import PieChartcomp from "../../components/PieChartComp";

const JobProgress = (props) => {
  const {
    handleSelect,
    select,
    month,
    currentWeek,
    averageDailySaved,
    jobsSaved,
    jobsApplied,
    jobsInterviewing,
    authState,
  } = props;
  return (
    <>
      <CardContainer flex column medium>
        <Card>
          <select onChange={handleSelect}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
          </select>
          <p>
            {select === "monthly"
              ? month
              : select === "weekly"
              ? currentWeek
              : select === "daily"
              ? "Daily Average: " + averageDailySaved
              : currentWeek}
          </p>
        </Card>
        <Card flex>
          <div>
            <PieChartcomp
              nominator={jobsSaved}
              denominator={
                select === "weekly"
                  ? authState.saved_job_goals_weekly
                  : select === "monthly"
                  ? authState.saved_job_goals_monthly
                  : select === "daily"
                  ? authState.saved_job_goals_daily
                  : authState.saved_job_goals_weekly
              }
            />
            <p>Total Jobs Saved: {jobsSaved}</p>
          </div>
          <div>
            <PieChartcomp
              nominator={jobsApplied}
              denominator={
                select === "weekly"
                  ? authState.applied_job_goals_weekly
                  : select === "monthly"
                  ? authState.applied_job_goals_monthly
                  : select === "daily"
                  ? authState.applied_job_goals_daily
                  : authState.applied_job_goals_weekly
              }
            />
            <p>Total Jobs Applied: {jobsApplied}</p>
          </div>
        </Card>

        <CardContent centerText>
          <FooterMain>
            <h3>Jobs Interviewing: {jobsInterviewing}</h3>
          </FooterMain>
        </CardContent>
      </CardContainer>
    </>
  );
};

export default JobProgress;
