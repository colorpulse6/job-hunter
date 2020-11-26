import React, { useState } from "react";
import { axiosPost } from "../javascript/fetchFunctions";
import { Link } from 'react-router-dom'

import { Circle, StyledCheck } from "../styles/styled-components/StylesCard";

import {
  StyledButton,
  StyledIcon,
} from "../styles/styled-components/StyledElements";

import { Card } from "../styles/styled-components/StyledContainers";

import Check from "../assets/draw-check-mark.png";
import Trash from "../assets/trash-icon.png";

const TodoComp = ({ todos, deleteUrl, finishUrl, fetch }) => {
  const [isFinished, setIsFinished] = useState(false);

  const removeTodo = (index) => {
    let type = "remove";
    axiosPost( deleteUrl, { index }, fetch, type);
  };

  const finishTodo = (index, content, due_date) => {
    setIsFinished(!isFinished);
    let data = isFinished;
    axiosPost(finishUrl, { index, content, due_date, data }, fetch);
    setIsFinished(!isFinished);
  };

  return (
    <>
      {todos
        ? todos.slice(0, 2).map((todo, index) => {
            return (
              <div key={index}>
                <Card noBorder flex spaceBetween inner shrink colored>
                  {/* only circle and title */}
                  <Card noBorder flex small noPadding>
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
                      

                  </Card>
                  <StyledButton noDisplay onClick={() => removeTodo(index)}>
                    <StyledIcon small src={Trash}></StyledIcon>
                  </StyledButton>
                  

                </Card>
                <hr></hr>
              </div>
            );
          })
        : null}
        
    </>
  );
};

export default TodoComp;
