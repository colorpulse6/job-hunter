import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import config from "../config";
import JobGoalSettings from "../components/JobGoalsSettings";
import {
  PageContainer,
  CardContainer,
  Card,
} from "../styles/styled-components/StyledContainers";
import Form from "../components/Form";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { authState, getUser } = authContext;
  const [inputs, setInputs] = useState({});

  const {
    saved_job_goals_daily,
    saved_job_goals_weekly,
    saved_job_goals_monthly,
    applied_job_goals_daily,
    applied_job_goals_weekly,
    applied_job_goals_monthly,
    github,
    linkedin,
    portfolio
  } = authState;

  useEffect(() => {
    console.log(inputs);
  });

  const profileSubmit = (e, column) => {
    e.preventDefault();
    let key = e.target.name;
    let value = e.target.value;

    axios
      .post(
        `${config.API_URL}/profile/edit-profile`,
        {
          key,
          value,
        },
        { withCredentials: true }
      )
      .then(() => {
        getUser();

        console.log(authState);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };
  console.log(authState);

  return (
    <PageContainer center flex column textCenter>
      <h3>{authState.name}</h3>
     
        <CardContainer flex noShadow noBorder>
          <Card medium>
            <h4>Saved Goals</h4>
            <JobGoalSettings
              handleChange={profileSubmit}
              column="saved_job_goals_"
              goalsDaily={saved_job_goals_daily}
              goalsWeekly={saved_job_goals_weekly}
              goalsMonthly={saved_job_goals_monthly}
            />
          </Card>

          <Card medium>
            <h4>Applied Goals</h4>

            <JobGoalSettings
              handleChange={profileSubmit}
              column="applied_job_goals_"
              goalsDaily={applied_job_goals_daily}
              goalsWeekly={applied_job_goals_weekly}
              goalsMonthly={applied_job_goals_monthly}
            />
          </Card>
        </CardContainer>
        <CardContainer flex noBorder noShadow>
          <form>
        <Form
        
          noSubmit
          
          onChange={profileSubmit}
          inputs={[
            {
              type: "text",
              id: "github",
              name: "github",
              label: github,
            },
            {
              type: "text",
              id: "portfolio",
              name: "portfolio",
              label: "Portfolio",
              value: portfolio,
            },
            {
              type: "text",
              id: "linkedin",
              name: "linkedin",
              label: "Linkedin",
              value: linkedin,
            },
          ]}
        />
        </form>
        </CardContainer>

    </PageContainer>
  );
};

export default Profile;
