import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import config from "../config";
import JobGoalSettings from "../components/JobGoalsSettings";
import { PageContainer } from "../styles/styled-components/StylesMain";



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

  const handleChange = (e, column="") => {
    setInputs({ [e.target.name]: e.target.value });
  };

  const profileSubmit = (e) => {
    e.preventDefault();
    let key = String(Object.keys(inputs));
    let value = String(Object.values(inputs));

    if (key.length != 0) {
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
          if (editing) {
            setEditing(false);
          }
          console.log(authState);
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    } 
  };
console.log(authState)

  const handleEdit = (params) => {
    
    if (editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
    setInfo(params);
    console.log(params);
  };

  return (
    <PageContainer >
      <h5>{authState.name}</h5>
      <div>
        <form onSubmit={profileSubmit}>
          {/* JOB GOALS */}
          <h5>Set Job Goals</h5>
          <PageContainer>
            <JobGoalSettings
              handleEdit={handleEdit}
              handleChange={handleChange}
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
          </PageContainer>

          {/* GITHUB */}

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

          {/* PORTFOLIO */}

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

          {/* LINKEDIN */}

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
        </form>
      </div>
    </PageContainer>
  );
};

export default Profile;
