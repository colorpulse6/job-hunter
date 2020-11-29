import React, { useState } from "react";
import { axiosPost } from "../javascript/fetchFunctions";
import { formatDate } from "../javascript/DateFunctions";
import { Circle, StyledCheck } from "../styles/styled-components/StylesCard";

import {
  StyledButton,
  StyledIcon,
} from "../styles/styled-components/StyledElements";

import { Card, Flex } from "../styles/styled-components/StyledContainers";

import Check from "../assets/draw-check-mark.png";
import Trash from "../assets/trash-icon.png";
import DatePicker from "react-datepicker";

const TodoComp = ({ todos, deleteUrl, finishUrl, fetch }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [datePickerIsOpen, setDatePicker] = useState(false);
  const [todoIndex, setTodoIndex] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const removeTodo = (index) => {
    let type = "remove";
    axiosPost(deleteUrl, { index }, fetch, type);
  };

  const finishTodo = (index, content, due_date) => {
    setIsFinished(!isFinished);
    let data = isFinished;
    axiosPost(finishUrl, { index, content, due_date, data }, fetch);
    setIsFinished(!isFinished);
  };

  const editTodoDate = (index, content, date) => {
    let data = isFinished;
    setDatePicker(!datePickerIsOpen);

    let due_date = new Date (date.toISOString());
    axiosPost(
      "/tasks/todos/edit-todo-date",
      { index, content, due_date, data },
      fetch
    );
  };
console.log(todos)
console.log(new Date("2020-11-15T23:00:00.000Z"))
  return (
    <>
      {todos
        ? todos.slice(0, 2).map((todo, index) => {
            return (
              <div key={index}>
                <Card noBorder flex spaceBetween inner>
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
                  <Flex flexEnd>
                    {todo.due_date !== "" ? (
                      <StyledButton
                        onClick={() => {
                          setDatePicker(!datePickerIsOpen);
                          setTodoIndex(index);
                        }}
                        todo
                        small
                        offColor
                      >
                        <p>{formatDate(todo.due_date)}</p>
                      </StyledButton>
                    ) : null}
                    {todoIndex === index ? (
                      <DatePicker
                        selected={new Date()}
                        onChange={(date) => {
                          editTodoDate(index, todo.content, date);
                        }}
                        open={datePickerIsOpen}
                        className="date-picker"
                        shouldCloseOnSelect={true}
                      />
                    ) : null}

                    <StyledButton noDisplay onClick={() => removeTodo(index)}>
                      <StyledIcon small src={Trash}></StyledIcon>
                    </StyledButton>
                  </Flex>
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
