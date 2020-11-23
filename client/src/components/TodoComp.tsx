import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../config";
import {
  Circle,
  StyledCheck,
} from "../styles/styled-components/StylesCard";

import { TaskContext } from "../context/TaskContext";
import { JobContext } from "../context/JobContext";
import {
  StyledButton,
  StyledIcon
} from "../styles/styled-components/StyledElements";

import { Card } from "../styles/styled-components/StyledContainers";

import Check from "../assets/draw-check-mark.png";
import Trash from "../assets/trash-icon.png"
import { axiosPost } from "../javascript/fetchFunctions";


const TodoComp = ({ todos, deleteUrl, finishUrl, fetch }) => {
  const taskContext = useContext(TaskContext);
  const { getTasks } = taskContext;
  const jobContext = useContext(JobContext);
  const { getJobs } = jobContext;
  const [isFinished, setIsFinished] = useState(false);

  const removeTodo = (index) => {
    let type = "remove"
    axiosPost(type, deleteUrl, {index}, fetch)
    // axios
    //   .post(
    //     `${config.API_URL}${deleteUrl}`,
    //     {
    //       index,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((result) => {
        
    //     fetch();
    //     console.log(result); 
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const finishTodo = (index, content, due_date) => {

    setIsFinished(!isFinished);
    let data = isFinished;
    axiosPost(finishUrl, {index, content, due_date, data}, fetch)
    setIsFinished(!isFinished);

    // axios
    //   .post(
    //     `${config.API_URL}${finishUrl}`,
    //     {
    //       index,
    //       content,
    //       due_date,
    //       data,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((result) => {
         
    //     fetch();
    //     setIsFinished(!isFinished);

    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log(index);
  };

  return (
    <>
      {todos
        ? todos.map((todo, index) => {
            return (
              <div key={index}>
                <Card center large flex spaceBetween>
                    
                      {todo.completed ? (
                        <StyledCheck
                          src={Check}
                          onClick={() =>
                            finishTodo(index, todo.content, todo.due_date)
                          }
                        ></StyledCheck>
                      ) : (
                        <Circle
                          id="input"
                          type="checkbox"
                          onChange={() =>
                            finishTodo(index, todo.content, todo.due_date)
                          }
                          checked={todo.completed}
                        />
                      )}
                      <p>
                        {todo.completed ? <s>{todo.content}</s> : todo.content}
                      </p>
                    
                    <StyledButton noDisplay onClick={() => removeTodo(index)}><StyledIcon small src={Trash}></StyledIcon></StyledButton>
                  
                </Card>
              </div>
            );
          })
        : null}
    </>
  );
};

export default TodoComp;
