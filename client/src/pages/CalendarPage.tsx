import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CalendarComp from "../components/Calendar"
import { JobContext } from "../context/JobContext";
import { TaskContext } from "../context/TaskContext";
import { PageContainer } from "../styles/styled-components/StylesMain"


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
    saved_job_goals_daily,
    saved_job_goals_weekly,
    saved_job_goaly_monthly,
  } = authState;
  return (
    <PageContainer>
      <h4>Goals</h4>
      <div>
        <p>Saved: {saved_job_goals_daily}</p>
        <p>Applied: {saved_job_goals_weekly}</p>
        <p>Interviewing: {saved_job_goaly_monthly}</p>
      </div>
      {jobState && taskState.todos ?  <CalendarComp jobs={jobState} tasks={taskState}/>:null}
     
    </PageContainer>
  );
}
