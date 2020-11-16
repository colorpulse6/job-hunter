import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";
import { JobContext } from "../context/JobContext";
import {
  Card,
  CardContent,
  CardFooter,
} from "../styles/styled-components/StylesCard";
import {
  PageContainer,
  HeaderMain,
} from "../styles/styled-components/StylesMain";
import PieChartcomp from "../components/PieChartComp";

import { monthNames } from "../javascript/DateFunctions";
import InfoDiv from "../components/home/InfoDiv";
import TodosComp from "../components/tasks/todos/TodosComp"

export default function Home(): JSX.Element {
  
  //CONTEXT
  const authContext = useContext(AuthContext);
  const { authState, isAuthenticated } = authContext;

  const taskContext = useContext(TaskContext);
  const { taskState } = taskContext;

  const jobContext = useContext(JobContext);
  const { jobState,jobsSaved,
    jobsApplied,
    jobsInterviewing } = jobContext;

  //STATE
 
  const [select, setSelect] = useState("");
  const [currentWeek, setCurrentWeek] = useState("");
  const [averageDailySaved, setAverageDailySaved] = useState(null);

  //DATE STUFF
  const date = new Date();
  const month = monthNames[date.getMonth()];

  //GET CURRENT WEEK
  // let week = [];
  const getWeek = () => {
    let week = [];
    for (let i = 1; i <= 7; i++) {
      let first = date.getDate() - date.getDay() + i;
      let day = new Date(date.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }
    //GET JOB SAVED DATES

    let currentWeek = week[0].substring(5) + " through " + week[6].substring(5);
    setCurrentWeek(currentWeek);
    let jobDates = [];
    jobState.map((job) => {
      if (job.date_added) {
        jobDates.push(job.date_added.substring(0, 10));
      }
    });
    //COUNT DUPLICATE DATES BY WEEK

    let weeklyJobSaved = 0;
    for (let i = 0; i < jobDates.length; i++) {
      for (let k = 0; k < week.length; k++) {
        if (jobDates[i] === week[k].substring(0, 10)) {
          weeklyJobSaved++;
        }
      }
    }
    //GET AVERAGE DAILY JOBS SAVED

    let averageDailySaved = (weeklyJobSaved / 7).toFixed(2);
    setAverageDailySaved(averageDailySaved);
  };


  console.log("job Saved= " + jobsSaved, jobsApplied, jobsInterviewing)

  useEffect(() => {

    getWeek();
  }, [jobState]);

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <PageContainer even menu>
      {!isAuthenticated ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            <HeaderMain>Tasks</HeaderMain>
            <Card large >
            <TodosComp 
            todos={taskState.todos}/>

              <InfoDiv
                state={taskState.challenges}
                element={"Challenges"}
                url="/tasks/challenges"
              />

              <InfoDiv
                state={taskState.learning}
                element={"Learning"}
                url="/tasks/learning"
              />
            </Card>
          </div>

          <div>
            <HeaderMain>Job Progress</HeaderMain>
            <Card flex column medium>
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
              <CardContent flex centerPadding>
                <div>
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
                  <p>Total Jobs Saved: {jobsSaved}</p>
                </div>
                <div>
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
                  <p>Total Jobs Applied: {jobsApplied}</p>
                </div>
              </CardContent>

              <CardFooter>
                <CardContent textCenter>
                  <h4>Jobs Interviewing: {jobsInterviewing}</h4>
                </CardContent>
              </CardFooter>
            </Card>

            <Card>
              <HeaderMain>Starred Jobs</HeaderMain>
              {jobState.length > 0 ? (
                jobState.map((job, index) => {
                  return job.star ? (
                    <CardContent squish key={index}>
                      <p>{job.company_name}</p>
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
