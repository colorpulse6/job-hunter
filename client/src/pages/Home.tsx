import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home(): JSX.Element {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;
console.log(authState)
const {name, job_goals_daily, job_goals_weekly, job_goaly_monthly} = authState
  return (
    <div>
      {authState.userInfo ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Home Page</h1>
          <h5>Hello {name}</h5>
          <h4>Goals</h4>
          <div>
      <p>Daily: {job_goals_daily}</p>
      <p>Weekly: {job_goals_weekly}</p>
      <p>Monthly: {job_goaly_monthly}</p>
          </div>
        </div>
      )}
    </div>
  );
}
