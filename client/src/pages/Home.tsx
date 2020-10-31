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
import PieChartcomp from "../components/PieChartComp"

// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

// const renderLineChart = (
//   <LineChart width={400} height={400} data={data}>
//     <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//   </LineChart>
// );

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
    console.log(authState);
  }, [jobState]);

 



  return (
    <PageContainer>
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
            <Card>
              <CardContent>
                <p>Jobs Saved: {jobsSaved}</p>
                <p>
                  Jobs Applied: {jobsApplied} out of{" "}
                  {authState.job_goals_weekly} (Weekly)
                </p>
                <PieChartcomp nominator={jobsApplied} denominator={authState.job_goals_weekly} />
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
