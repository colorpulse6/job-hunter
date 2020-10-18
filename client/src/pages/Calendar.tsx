import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function Calendar(): JSX.Element {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;
  console.log(authState);
  const {
    name,
    job_goals_daily,
    job_goals_weekly,
    job_goaly_monthly,
  } = authState;
  return (
    <div>
      Calendar Page
      <h4>Goals</h4>
      <div>
        <p>Daily: {job_goals_daily}</p>
        <p>Weekly: {job_goals_weekly}</p>
        <p>Monthly: {job_goaly_monthly}</p>
      </div>
    </div>
  );
}
