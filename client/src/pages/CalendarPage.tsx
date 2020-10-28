import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CalendarComp from "../components/Calendar"
import { JobContext } from "../context/JobContext";
import { TaskContext } from "../context/TaskContext";



export default function CalendarPage(): JSX.Element {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;
  // console.log(authState);
  const jobContext = useContext(JobContext);
  const { jobState } = jobContext;

  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;
  
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
      {jobState && taskState.todos ?  <CalendarComp jobs={jobState} tasks={taskState}/>:null}
     
    </div>
  );
}
