import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";

export default function Home(): JSX.Element {
  const authContext = useContext(AuthContext);
  const { authState, isAuthenticated } = authContext;

  const taskContext = useContext(TaskContext);
  const { taskState } = taskContext;

  console.log(taskState);
  

  return (
    <div>
      {!isAuthenticated ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Home Page</h1>
          <h3>Hello {authState.name}</h3>

          <div>
            <h4>Tasks</h4>

            <div>
              <h5>Todos</h5>
              {taskState.todos.length > 0 ? (
                taskState.todos.map((todo) => {
                  
                  return todo.completed === false ? (
                    <div>
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
              <h5>Challenges</h5>
              {taskState.challenges.length > 0 ? (
                taskState.challenges.map((challenge) => {
                  return challenge.completed === false ? (
                    <div>
                      <p>{challenge.name}</p>
                      <a href={challenge.url} target="_blank">Url</a>
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
              <h5>Learning</h5>
              {taskState.learning.length > 0 ? (
                taskState.learning.map((learning) => {
                  return learning.completed === false ? (
                    <div>
                      <p>{learning.name}</p>
                      <a href={learning.tutorial_url} target="_blank">Url</a>
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


          </div>
        </div>
      )}
    </div>
  );
}
