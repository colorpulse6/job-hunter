import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import { TaskContext } from "../../context/TaskContext";
import { JobContext } from "../../context/JobContext";

import { PageContainer } from "../../styles/styled-components/StyledContainers";
import { Link } from "react-router-dom";

import Quote from "./Quote";
import Tasks from "./Tasks";
import JobProgress from "./JobProgress";
import StarredJobs from "./StarredJobs";

import { getWeek, month } from "../../javascript/DateFunctions";
import { HeaderMain } from "../../styles/styled-components/StyledText";
export default function Dashboard(): JSX.Element {
  //CONTEXT
  const authContext = useContext(AuthContext);
  const { authState, isAuthenticated } = authContext;

  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;

  const jobContext = useContext(JobContext);
  const { jobState, jobsSaved, jobsApplied, jobsInterviewing } = jobContext;

  //STATE

  const [select, setSelect] = useState("");
  const [currentWeek, setCurrentWeek] = useState("");
  const [averageDailySaved, setAverageDailySaved] = useState(null);

  useEffect(() => {
    getWeek(setCurrentWeek, setAverageDailySaved, jobState);
  }, [jobState]);

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };
  console.log(taskState)

  return (
    <PageContainer flex even>
      {!isAuthenticated ? (
        <p>Loading...</p>
      ) : (
        <>
          <div>
            {/* <Quote /> */}
            <HeaderMain>
              <strong>Tasks</strong>
            </HeaderMain>

            <Tasks taskState={taskState} getTasks={getTasks} jobs={jobState}/>
          </div>

          <div>
            <HeaderMain>Job Progress</HeaderMain>

            <JobProgress
              handleSelect={handleSelect}
              select={select}
              month={month}
              currentWeek={currentWeek}
              averageDailySaved={averageDailySaved}
              jobsSaved={jobsSaved}
              jobsApplied={jobsApplied}
              jobsInterviewing={jobsInterviewing}
              authState={authState}
            />

            <div>
              <StarredJobs jobState={jobState} />
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
}
