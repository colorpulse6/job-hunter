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

  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState(undefined);

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

  const handleChange = (e, column = "") => {
    setInputs({ [e.target.name]: e.target.value });
    console.log(e.target);
    console.log("fart");
  };

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
    <PageContainer center flex>
      {/* <h3>{authState.name}</h3> */}
      <>
        <form>
          <Card column>
            <h4>Saved Goals</h4>
            <JobGoalSettings
              handleChange={profileSubmit}
              column="saved_job_goals_"
              goalsDaily={saved_job_goals_daily}
              goalsWeekly={saved_job_goals_weekly}
              goalsMonthly={saved_job_goals_monthly}
            />
          </Card>
        </form>

        <h4>Applied Goals</h4>
        <form>
        <Card column>
          <JobGoalSettings
            handleChange={profileSubmit}
            column="applied_job_goals_"
            goalsDaily={applied_job_goals_daily}
            goalsWeekly={applied_job_goals_weekly}
            goalsMonthly={applied_job_goals_monthly}
          />
          </Card>
        </form>

        {/* <form onSubmit={(e)=>{profileSubmit(e, )}}>
          <h5>Set Job Goals</h5>
          <CardContainer large flex>
            <JobGoalSettings
              handleEdit={handleEdit}
              handleChange={profileSubmit}
              editCheck={editing}
              infoCheck={info}
              goalsDaily={saved_job_goals_daily }
              goalsWeekly={saved_job_goals_weekly}
              goalsMonthly={saved_job_goals_monthly}
              title="Saved"
              column="saved_"

            />
            <JobGoalSettings
              handleEdit={handleEdit}
              handleChange={handleChange}
              editCheck={editing}
              infoCheck={info}
              goalsDaily={applied_job_goals_daily }
              goalsWeekly={applied_job_goals_weekly}
              goalsMonthly={applied_job_goals_monthly}
              title="Applied"
              column="applied_"
            />
          </CardContainer>


          <div>
            {(github && !editing) || (github && editing && info != "github") ? (
              <div>
                <p>Github: {authState.github}</p>{" "}
                <button
                  onClick={() => {
                    handleEdit("github");
                  }}
                >
                  Edit
                </button>
              </div>
            ) : editing && info === github ? (
              <div>
                <input
                  type="text"
                  id="github"
                  name="github"
                  placeholder="Github"
                  onChange={handleChange}
                />
                <input type="submit" value="Set" />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  id="github"
                  name="github"
                  placeholder="Github"
                  onChange={handleChange}
                />
                <input type="submit" value="Set" />
              </div>
            )}
          </div>


          <div>
            {(portfolio && !editing) || (editing && info != "portfolio") ? (
              <div>
                <p>Portfolio: {authState.portfolio}</p>{" "}
                <button
                  onClick={() => {
                    handleEdit("portfolio");
                  }}
                >
                  Edit
                </button>
              </div>
            ) : editing && info === portfolio ? (
              <div>
                <input
                  type="text"
                  id="portfolio"
                  name="portfolio"
                  placeholder="Portfolio"
                  onChange={handleChange}
                />
                <input type="submit" value="Set" />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  id="portfolio"
                  name="portfolio"
                  placeholder="Portfolio"
                  onChange={handleChange}
                />
                <input type="submit" value="Set" />
              </div>
            )}
          </div>


          <div>
            {(linkedin && !editing) ||
            (linkedin && editing && info != "linkedin") ? (
              <div>
                <p>Linkedin: {authState.linkedin}</p>{" "}
                <button
                  onClick={() => {
                    handleEdit("linkedin");
                  }}
                >
                  Edit
                </button>
              </div>
            ) : editing && info === linkedin ? (
              <div>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  placeholder="Linkedin"
                  onChange={handleChange}
                />
                <input type="submit" value="Set" />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  placeholder="Linkedin"
                  onChange={handleChange}
                />
                <input type="submit" value="Set" />
              </div>
            )}
          </div>
        </form> */}
      </>
    </PageContainer>
  );
};

export default Profile;
