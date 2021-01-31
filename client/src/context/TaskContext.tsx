import React, { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { ContextProps } from "../interfaces";
import { AuthContext } from "../context/AuthContext";

const TaskContext = createContext<any>(null);

const TaskProvider: React.FC<ContextProps> = ({ children }) => {
  const [taskState, setTasks] = useState([{}]);
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  useEffect(() => {
    getTasks();
  }, [authState]);

  const getTasks = () => {
    axios
      .get(`${config.API_URL}/tasks`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setTasks(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {taskState ? (
        <TaskContext.Provider
          value={{
            taskState,
            getTasks,
          }}
        >
          {children}
        </TaskContext.Provider>
      ) : null}
    </>
  );
};
export { TaskContext, TaskProvider };
