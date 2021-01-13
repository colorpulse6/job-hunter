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
import { ProfilePic, ProfilePicEmpty, Logo } from "../styles/styled-components/StyledAssets";

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

  const profileSubmit = (e) => {
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

  //UPLOAD PROFILE PIC
  const uploadProfilePic = (e) => {
    e.preventDefault();

    let profilePicUrl = e.target.file.files[0];

    let uploadData = new FormData();
    uploadData.append("profilePicUrl", profilePicUrl);
    axios
      .post(`${config.API_URL}/profile/upload`, uploadData)
      .then((res) => {
        let profilePicUrl = res.data.secure_url;
        console.log(profilePicUrl);
        axios
          .post(
            `${config.API_URL}/profile/edit-profile/upload-profile-pic`,
            { profilePicUrl },
            { withCredentials: true }
          )
          .then((result) => {
            getUser();
            console.log(result.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showText = () => {
    var element = document.getElementById("imageUploaded");
    element.classList.remove("hide");
  };

  console.log(authState);

  return (
    <PageContainer center flex column textCenter>
      <form
        onSubmit={(e) => {
          uploadProfilePic(e);
        }}
      >
        <input type="file" id="file" name="file" onChange={showText} />
        <label htmlFor="file">Upload Profile Pic</label>
        <p className="image-uploaded hide" id="imageUploaded">
          Image Uploaded!
        </p>{" "}
        <button type="submit">Save</button>
      </form>
      <div style={{ width: "550px" }}>
        <Flex flexStart>
          {" "}
          {authState.profile_pic_url ? (
          <ProfilePic
               
                src={authState.profile_pic_url}
              />
            ) : (
              <ProfilePicEmpty
             
              >
                {initials}
              </ProfilePicEmpty>
            )}
          <h3>{authState.name}</h3>
          {authState ? <p>{authState.profie_pic_url}</p> : null}
        </Flex>
      </div>
      <hr></hr>
      <Card large taller center roundedCorners shadow noBorder>
        <Flex spaceAround>
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
        </Flex>

        <Flex center>
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
                required: true,
              },
              {
                type: "text",
                id: "portfolio",
                name: "portfolio",
                label: "Portfolio",
                value: portfolio,
                required: true,
              },
              {
                type: "text",
                id: "linkedin",
                name: "linkedin",
                label: "Linkedin",
                value: linkedin,
                required: true,
              },
            ]}
          />
        </Flex>
      </Card>
    </PageContainer>
  );
};

export default Profile;
