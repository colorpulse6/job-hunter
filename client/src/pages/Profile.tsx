import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import config from "../config";
import JobGoalSettings from "../components/JobGoalsSettings";
import {
  PageContainer,
  CardContainer,
  Card,
  Flex,
} from "../styles/styled-components/StyledContainers";
import { StyledIcon } from "../styles/styled-components/StyledElements";
import { ProfilePic, Logo } from "../styles/styled-components/StyledAssets";

import Form from "../components/Form";

import BackButton from "../assets/keyboard-left-arrow-button.png";

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
    portfolio,
  } = authState;

  if (authState.name) {
    var initials = authState.name
      .split(" ")
      .map(function (item) {
        return item[0];
      })
      .join("");
  }

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
      <div style={{ width: "550px" }}>
        <Flex flexStart>
          {" "}
          <ProfilePic>{initials}</ProfilePic>
          <h3>{authState.name}</h3>
        </Flex>
      </div>
      <hr></hr>
      <CardContainer flex noShadow noBorder medium>
        <div>
          <h4>Saved Goals</h4>
          <JobGoalSettings
            handleChange={profileSubmit}
            column="saved_job_goals_"
            goalsDaily={saved_job_goals_daily}
            goalsWeekly={saved_job_goals_weekly}
            goalsMonthly={saved_job_goals_monthly}
          />
        </div>

        <div>
          <h4>Applied Goals</h4>

          <JobGoalSettings
            handleChange={profileSubmit}
            column="applied_job_goals_"
            goalsDaily={applied_job_goals_daily}
            goalsWeekly={applied_job_goals_weekly}
            goalsMonthly={applied_job_goals_monthly}
          />
        </div>
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
                label: "Github",
                value: github,
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
