import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import config from "../config";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { authState, getUser } = authContext;
  const [inputs, setInputs] = useState({});

  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState(undefined);

  const {
    job_goals_monthly,
    github,
    linkedin,
    job_goals_daily,
    portfolio,
    job_goals_weekly,
  } = authState;

  const handleChange = (e) => {
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

  const handleEdit = (e, params) => {
    if (editing) {
      setEditing(false);
    } else {
      setEditing(true);
    }
    setInfo(params);
  };

  return (
    <div>
      Profile Page for <h5>{authState.name}</h5>
      <div>
        <form onSubmit={profileSubmit}>
          {/* JOB GOALS */}

          <div>
            <h5>Set Job Goals</h5>
            {(job_goals_daily && !editing) ||
            (job_goals_daily && editing && info != "job_goals_daily") ? (
              <div>
                <p>Daily Goal: {authState.job_goals_daily}</p>{" "}
                <button
                  onClick={(e) => {
                    handleEdit(e, "job_goals_daily");
                  }}
                >
                  Edit
                </button>
              </div>
            ) : job_goals_daily && editing && info === "job_goals_daily" ? (
              <div>
                <input
                  type="number"
                  id="job_goals_daily"
                  name="job_goals_daily"
                  placeholder="Daily"
                  onChange={handleChange}
                />
                <input type="submit" value="Edit" />
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  id="job_goals_daily"
                  name="job_goals_daily"
                  placeholder="Daily"
                  onChange={handleChange}
                />
                <input type="submit" value="Set" />
              </div>
            )}
          </div>
          <div>
            {(job_goals_weekly && !editing) ||
            (job_goals_weekly && editing && info != "job_goals_weekly") ? (
              <div>
                <p>Weekly Goal: {authState.job_goals_weekly}</p>{" "}
                <button
                  onClick={(e) => {
                    handleEdit(e, "job_goals_weekly");
                  }}
                >
                  Edit
                </button>
              </div>
            ) : editing && info === job_goals_weekly ? (
              <div>
                <input
                  type="number"
                  id="job_goals_weekly"
                  name="job_goals_weekly"
                  placeholder="Weekly"
                  onChange={handleChange}
                />
                <input type="submit" value="Set" />
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  id="job_goals_weekly"
                  name="job_goals_weekly"
                  placeholder="Weekly"
                  onChange={handleChange}
                />
                <input type="submit" value="Set" />
              </div>
            )}
            <div>
              {(job_goals_monthly && !editing) ||
              (job_goals_monthly && editing && info != "job_goals_monthly") ? (
                <div>
                  <p>Monthly Goal: {authState.job_goals_monthly}</p>{" "}
                  <button
                    onClick={(e) => {
                      handleEdit(e, "job_goals_monthly");
                    }}
                  >
                    Edit
                  </button>
                </div>
              ) : editing && info === job_goals_monthly ? (
                <div>
                  <input
                    type="number"
                    id="job_goals_monthly"
                    name="job_goals_monthly"
                    placeholder="Monthly"
                    onChange={handleChange}
                  />
                  <input type="submit" value="Set" />
                </div>
              ) : (
                <div>
                  <input
                    type="number"
                    id="job_goals_monthly"
                    name="job_goals_monthly"
                    placeholder="Monthly"
                    onChange={handleChange}
                  />
                  <input type="submit" value="Set" />
                </div>
              )}
            </div>
          </div>

          {/* GITHUB */}

          <div>
            {(github && !editing) || (github && editing && info != "github") ? (
              <div>
                <p>Github: {authState.github}</p>{" "}
                <button
                  onClick={(e) => {
                    handleEdit(e, "github");
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
                  onClick={(e) => {
                    handleEdit(e, "portfolio");
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
                  onClick={(e) => {
                    handleEdit(e, "linkedin");
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
    </div>
  );
};

export default Profile;
