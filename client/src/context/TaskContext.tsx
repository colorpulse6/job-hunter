import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { ContextProps } from "../interfaces";


const TaskContext = createContext(null);

const TaskProvider: React.FC<ContextProps> = ({ children }) => {
  const [taskState, setTasks] = useState([{}]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    axios
      .get(`${config.API_URL}/tasks`, { withCredentials: true })
      .then((res) => {
        if(res.data){
          setTasks(res.data);

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