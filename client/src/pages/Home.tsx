import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";
import { JobContext } from "../context/JobContext";

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

console.log(authState)
  const getJobStatus =  () => {
     jobState.map((job) => {
      if (job.job_saved) {
        setJobsSaved(jobsSaved => jobsSaved + 1);
      }
      if (job.applied) {
        setJobsApplied(jobsApplied => jobsApplied + 1);
      }
      if (job.interview1 || job.interview2 || job.interview3) {
        setJobsInterviewing(jobsInterviewing => jobsInterviewing + 1);
      }
    });
  };

  useEffect(() => {
    getJobStatus();
  }, [jobState]);

  return (
    <div>
      {!isAuthenticated ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Home Page</h1>
          <h2>Hello {authState.name}</h2>

          <div>
            <h3>Tasks</h3>

            <div>
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
            </div>

            <div>
              <h4>Challenges</h4>
              {taskState.challenges.length > 0 ? (
                taskState.challenges.map((challenge, index) => {
                  return challenge.completed === false ? (
                    <div key={index}>
                      <p>{challenge.name}</p>
                      <a href={challenge.url} target="_blank">
                        Url
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
            </div>

            <div>
              <h4>Learning</h4>
              {taskState.learning.length > 0 ? (
                taskState.learning.map((learning, index) => {
                  return learning.completed === false ? (
                    <div key={index}>
                      <p>{learning.name}</p>
                      <a href={learning.tutorial_url} target="_blank">
                        Url
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
            </div>

            <div>
              <h4>Starred Jobs</h4>
              {jobState.length > 0 ? (
                jobState.map((job, index) => {
                  return job.star ? (
                    <div key={index}>
                      <h5>{job.company_name}</h5>
                      <p>{job.job_title}</p>
                    </div>
                  ) : null;
                })
              ) : (
                <div>
                  <p>No Learning...</p>
                  <Link to="/tasks/learning">Add Learning?</Link>
                </div>
              )}
            </div>

            <div>
              <h4>Jobs Saved: {jobsSaved}</h4>
              <h4>Jobs Applied: {jobsApplied} out of {authState.job_goals_weekly} (Weekly)</h4>
              <h4>Jobs Interviewing: {jobsInterviewing}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
