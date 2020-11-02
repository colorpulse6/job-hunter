import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";
import { JobContext } from "../context/JobContext";
import { Card, CardContent } from "../styles/styled-components/StylesCard";
import {
  PageContainer,
  HeaderMain,
} from "../styles/styled-components/StylesMain";
import PieChartcomp from "../components/PieChartComp";

import { monthNames } from "../javascript/DateFunctions"
export default function Home(): JSX.Element {
  //CONTEXT
  const authContext = useContext(AuthContext);
  const { authState, isAuthenticated } = authContext;

  const taskContext = useContext(TaskContext);
  const { taskState } = taskContext;

  const jobContext = useContext(JobContext);
  const { jobState } = jobContext;

  //STATE
  const [jobsSaved, setJobsSaved] = useState(0);
  const [jobsApplied, setJobsApplied] = useState(0);
  const [jobsInterviewing, setJobsInterviewing] = useState(0);
  const [select, setSelect] = useState("");

  //DATE STUFF
  
  const date = new Date()
  const month = monthNames[date.getMonth()];

  //GET CURRENT WEEK
  let week = [];

  for (let i = 1; i <= 7; i++) {
    let first = date.getDate() - date.getDay() + i;
    let day = new Date(date.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
  }
  let currentWeek = week[0].substring(5) + " through " + week[6].substring(5);

  
  //GET JOB SAVED DATES
  let jobDates = []
  jobState.map((job)=> {
    jobDates.push(job.date_added.substring(0,10))
  })

  //COUNT DUPLICATE DATES BY WEEK

  let weeklyJobSaved = 0;
  for(let i =0;i<jobDates.length;i++){
    for(let k = 0;k< week.length;k++){
      if(jobDates[i] === week[k].substring(0,10)){
        weeklyJobSaved ++;
      }
    }
  }
  

  //GET AVERAGE DAILY JOBS SAVED
  let averageDailySaved = (weeklyJobSaved / 7).toFixed(2)
 console.log(averageDailySaved)

 //


  const getJobStatus = () => {
    jobState.map((job) => {
      if (job.job_saved) {
        setJobsSaved((jobsSaved) => jobsSaved + 1);
      }
      if (job.applied) {
        setJobsApplied((jobsApplied) => jobsApplied + 1);
      }
      if (job.interview1 || job.interview2 || job.interview3) {
        setJobsInterviewing((jobsInterviewing) => jobsInterviewing + 1);
      }
    });
  };

  useEffect(() => {
    getJobStatus();
    console.log(jobState);
  }, [jobState]);

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <PageContainer even>
      {!isAuthenticated ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <HeaderMain>Tasks</HeaderMain>
            <Card>
              <CardContent>
                <h4>Todos</h4>
                {taskState.todos.length > 0 ? (
                  taskState.todos.map((todo, index) => {
                    return todo.completed === false ? (
                      <div key={index}>
                        <p>{todo.content}</p>
                      </div>
                    ) : null;
                  })
                ) : (
                  <div>
                    <p>No Todos...</p>
                    <Link to="/tasks/todos">Add Todo?</Link>
                  </div>
                )}
              </CardContent>

              <CardContent>
                <h4>Challenges</h4>
                {taskState.challenges.length > 0 ? (
                  taskState.challenges.map((challenge, index) => {
                    return challenge.completed === false ? (
                      <div key={index}>
                        <p>{challenge.name}</p>
                        <a href={challenge.url} target="_blank">
                          {challenge.url}
                        </a>
                      </div>
                    ) : null;
                  })
                ) : (
                  <div>
                    <p>No Challenges...</p>
                    <Link to="/tasks/challenges">Add Challenge?</Link>
                  </div>
                )}
              </CardContent>

              <CardContent>
                <h4>Learning</h4>
                {taskState.learning.length > 0 ? (
                  taskState.learning.map((learning, index) => {
                    return learning.completed === false ? (
                      <div key={index}>
                        <p>{learning.name}</p>
                        <a href={learning.tutorial_url} target="_blank">
                          {learning.tutorial_url}
                        </a>
                      </div>
                    ) : null;
                  })
                ) : (
                  <div>
                    <p>No Learning...</p>
                    <Link to="/tasks/learning">Add Learning?</Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <HeaderMain>Job Progress</HeaderMain>
            <Card progress>
              <CardContent>
                <select onChange={handleSelect}>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                </select>
                <p>
                  {select === "monthly"
                    ? month
                    : select === "weekly"
                    ? currentWeek
                    : select === "daily"
                    ? "Daily Average: " + averageDailySaved
                    : currentWeek}
                </p>
                </CardContent>
                <CardContent>

                <p>Total Jobs Saved: {jobsSaved}</p>
                <PieChartcomp
                  nominator={jobsSaved}
                  denominator={
                    select === "weekly"
                      ? authState.saved_job_goals_weekly
                      : select === "monthly"
                      ? authState.saved_job_goals_monthly
                      : select === "daily"
                      ? authState.saved_job_goals_daily
                      : authState.saved_job_goals_weekly
                  }
                />
                </CardContent>
                <CardContent>

                <p>Total Jobs Applied: {jobsApplied}</p>
                <PieChartcomp
                  nominator={jobsApplied}
                  denominator={
                    select === "weekly"
                      ? authState.applied_job_goals_weekly
                      : select === "monthly"
                      ? authState.applied_job_goals_monthly
                      : select === "daily"
                      ? authState.applied_job_goals_daily
                      : authState.applied_job_goals_weekly
                  }
                />

                <p>Jobs Interviewing: {jobsInterviewing}</p>
              </CardContent>

             
            </Card>
            <Card>
            <HeaderMain>Starred Jobs</HeaderMain>
              {jobState.length > 0 ? (
                jobState.map((job, index) => {
                  return job.star ? (
                    <CardContent key={index}>
                      <h5>{job.company_name}</h5>
                      <p>{job.job_title}</p>
                    </CardContent>
                  ) : null;
                })
              ) : (
                <CardContent>
                  <p>No Starred Jobs...</p>
                  <Link to="/job-board">Add a Favorite?</Link>
                </CardContent>
              )}
              </Card>
          </div>
        </>
      )}
    </PageContainer>
  );
}
