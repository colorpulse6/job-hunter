import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import {
  CardContent,
  CardItem,
  Circle,
  StyledCheck,
} from "../../../styles/styled-components/StylesCard";

import { TaskContext } from "../../../context/TaskContext";
import { JobContext } from "../../../context/JobContext";
import {
  StyledButton,
  StyledIcon
} from "../../../styles/styled-components/StyledElements";

import {
  CardContainer,
  Card
} from "../../../styles/styled-components/StyledContainers";

import Check from "../../../assets/draw-check-mark.png";
import Trash from "../../../assets/trash-icon.png"


const TodosComp = ({ todos, deleteUrl, finishUrl, fetch }) => {
  const taskContext = useContext(TaskContext);
  const { getTasks } = taskContext;
  const jobContext = useContext(JobContext);
  const { getJobs } = jobContext;
  const [isFinished, setIsFinished] = useState(false);

  const removeTodo = (index) => {
    console.log(index);
    axios
      .post(
        `${config.API_URL}${deleteUrl}`,
        {
          index,
        },
        { withCredentials: true }
      )
      .then((result) => {
        
        fetch();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const finishTodo = (index, content, due_date) => {
    setIsFinished(!isFinished);
    let data = isFinished;
    axios
      .post(
        `${config.API_URL}${finishUrl}`,
        {
          index,
          content,
          due_date,
          data,
        },
        { withCredentials: true }
      )
      .then((result) => {
        
        fetch();
        setIsFinished(!isFinished);

        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(index);
  };
  console.log(todos);
  return (
    <>
      {todos
        ? todos.map((todo, index) => {
            return (
              <div key={index}>
                <Card flex spaceBetween>
                  
                    
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

export default TodosComp;
