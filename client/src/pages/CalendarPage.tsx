import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CalendarComp from "../components/Calendar"
import { JobContext } from "../context/JobContext";
import { TaskContext } from "../context/TaskContext";
import { PageContainer } from "../styles/styled-components/StylesMain"

import { Card, CardContent } from "../styles/styled-components/StylesCard"


export default function CalendarPage(): JSX.Element {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;
  // console.log(authState);
  const jobContext = useContext(JobContext);
  const { jobState } = jobContext;

  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;
  
  const {
    saved_job_goals_daily,
    saved_job_goals_weekly,
    saved_job_goals_monthly,
    applied_job_goals_daily,
    applied_job_goals_weekly,
    applied_job_goals_monthly
  } = authState;
  return (
    <PageContainer>
      <div>
      <h4>Goals</h4>
      
      <Card calendarGoals short>
        <CardContent>
          
        <p>Saved Goals Daily: {saved_job_goals_daily}</p>
        <p>Saved Goals Weekly: {saved_job_goals_weekly}</p>
        <p>Saved Goals Monthly: {saved_job_goals_monthly}</p>
        </CardContent>
      </Card>
      <Card calendarGoals short>
        <CardContent>
          
        <p>Applied Goals Daily: {applied_job_goals_daily}</p>
        <p>Applied Goals Weekly: {applied_job_goals_weekly}</p>
        <p>Applied Goals Monthly: {applied_job_goals_monthly}</p>
        </CardContent>
      </Card>
      </div>
      {jobState && taskState.todos ?  <CalendarComp jobs={jobState} tasks={taskState}/>:null}
     
    </PageContainer>
  );
}
