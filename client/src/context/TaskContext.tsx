import React, { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { ContextProps } from "../interfaces";
import { AuthContext } from "../context/AuthContext";

const TaskContext = createContext<any>(null);

const TaskProvider: React.FC<ContextProps> = ({ children }) => {
  const [taskState, setTasks] = useState([{}]);
  const authContext = useContext(AuthContext);
  const { authState, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      getTasks();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    console.log(taskState);
  }, [taskState]);

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
      <TaskContext.Provider
        value={{
          taskState,
          getTasks,
        }}
      >
        {children}
      </TaskContext.Provider>
    </>
  );
};
export { TaskContext, TaskProvider };
