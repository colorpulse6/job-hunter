import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import config from "../config";

const Profile = () => {

  const authContext = useContext(AuthContext);
  const { authState } = authContext;
  const [user, setUser] = useState([{}]);
  const [inputs, setInputs] = useState({});
  const [editing, setEditing] = useState(false);
  const [info, setInfo] = useState("");

console.log(editing)
  const getUserInfo = () => {
    axios
      .get(`${config.API_URL}/user`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(authState);
  const handleChange = (e) => {
    setInputs({ [e.target.name]: e.target.value });

    // console.log(inputs);
  };

  const profileSubmit = (e) => {
    e.preventDefault();
    let key = String(Object.keys(inputs));
    let value = String(Object.values(inputs));
    console.log(key, value);

    axios
      .post(
        `${config.API_URL}/profile/edit-profile`,
        {
          key,
          value,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getUserInfo();
        console.log(user);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const handleEdit = (param, e) => {
    if(editing){
      setEditing(false)
      } else {
        setEditing(true)
      }
      setInfo(param)
  }
  const {
    job_goals_monthly,
    github,
    linkedin,
    job_goals_daily,
    portfolio,
    job_goals_weekly,
  } = authState;

  return (
    <div>
      Profile Page for <h5>{authState.name}</h5>
      <div>
        <form onSubmit={profileSubmit}>
          {/* JOB GOALS */}

          <div>
            <h5>Set Job Goals</h5>
            {job_goals_daily && !editing ? (
              <div>
                <p>Daily Goal: {job_goals_daily}</p>
                <button type="button" onClick={(e) => handleEdit(job_goals_daily, e)}>Edit</button>
                
              </div>
            ) : editing && info === job_goals_daily ? (
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
            
            {job_goals_weekly && !editing  ? (
              <div>
                <p>Weekly Goal: {authState.job_goals_weekly}</p>{" "}
                <button type="button" onClick={() => setEditing(true)}>Edit</button>
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

            {job_goals_monthly && !editing  ? (
              <div>
                <p>Monthly Goal: {authState.job_goals_monthly}</p>{" "}
                <button type="button" onClick={() => setEditing(true)}>Edit</button>
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

          <div>
            {github && !editing  ? (
              <div>
                <p>{authState.github}</p>{" "}
                <button type="button" onClick={() => setEditing(true)}>Edit</button>
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
            {portfolio && !editing  ? (
              <div>
                <p>{authState.portfolio}</p>{" "}
                <button type="button" onClick={() => setEditing(true)}>Edit</button>
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
            {linkedin && !editing  ? (
              <div>
                <p>{authState.linkedin}</p>{" "}
                <button type="button" onClick={() => setEditing(true)}>Edit</button>
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
