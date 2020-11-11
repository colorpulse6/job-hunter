import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardItem,
  Circle,
  StyledCheck,
} from "../../../styles/styled-components/StylesCard";
import axios from "axios";
import config from "../../../config";
import { TaskContext } from "../../../context/TaskContext";
import Check from "../../../assets/draw-check-mark.png";
const TodosComp = ({ todos }) => {
  const taskContext = useContext(TaskContext);
  const { getTasks } = taskContext;
  const [isFinished, setIsFinished] = useState(false);

  const removeTodo = (index) => {
    console.log(index);
    axios
      .post(
        `${config.API_URL}/tasks/todos/delete-todo`,
        {
          index,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getTasks();
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
        `${config.API_URL}/tasks/todos/finish-todo`,
        {
          index,
          content,
          due_date,
          data,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getTasks();
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
                <Card inner>
                  <CardContent flex todo>
                    <CardItem>
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
                    </CardItem>
                    <button onClick={() => removeTodo(index)}>delete</button>
                  </CardContent>
                </Card>
              </div>
            );
          })
        : null}
    </>
  );
};

export default TodosComp;
