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

import { TodoCompProps, ITodo } from "../interfaces";

const TodoComp = (props: TodoCompProps) => {
  const [isFinished, setIsFinished] = useState(false);
  const [datePickerIsOpen, setDatePicker] = useState(false);
  const [todoIndex, setTodoIndex] = useState<number | null>(null);
  const [startDate, setStartDate] = useState(new Date());

  const {
    todos,
    deleteUrl,
    finishUrl,
    fetch,
    limit,
    noDate,
    secondLineColor,
  } = props;

  const removeTodo = (index: number) => {
    let type = "remove";
    axiosPost(deleteUrl, { index }, fetch, type);
  };
  const finishTodo = (index: number, content: string, due_date: string) => {
    setIsFinished(!isFinished);
    let data = isFinished;
    axiosPost(finishUrl, { index, content, due_date, data }, fetch);
    setIsFinished(!isFinished);
  };

  const editTodoDate = (index: number, content: string, date: Date) => {
    let data = isFinished;
    setDatePicker(!datePickerIsOpen);

    let due_date = new Date(date.toISOString());
    axiosPost(
      "/tasks/todos/edit-todo-date",
      { index, content, due_date, data },
      fetch
    );
  };

  const toDo = (todo: ITodo, index: number) => {
    return (
      <div key={index}>
        <Card noBorder flex spaceBetween>
          {/* only circle and title */}
          <Card noBorder flex small noPadding>
            {todo.completed ? (
              <StyledCheck
                src={Check}
                onClick={() => finishTodo(index, todo.content, todo.due_date)}
              ></StyledCheck>
            ) : (
              <Circle
                id="input"
                type="checkbox"
                onChange={() => finishTodo(index, todo.content, todo.due_date)}
                checked={todo.completed}
              />
            )}
            <p style={{ margin: "0" }}>
              {todo.completed ? <s>{todo.content}</s> : todo.content}
            </p>
          </Card>
          <Flex flexEnd todo>
            {todo.due_date !== "" && !noDate ? (
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
              <div style={{ position: "absolute", top: "50px" }}>
                <DatePicker
                  selected={new Date()}
                  onChange={(date: Date) => {
                    editTodoDate(index, todo.content, date);
                  }}
                  open={datePickerIsOpen}
                  className="date-picker"
                  shouldCloseOnSelect={true}
                />{" "}
              </div>
            ) : null}

            <StyledButton noDisplay onClick={() => removeTodo(index)}>
              <StyledIcon small src={Trash} />
            </StyledButton>
          </Flex>
        </Card>
        <hr className={secondLineColor ? "hr2" : undefined}></hr>
      </div>
    );
  };

  return (
    <>
      {todos && limit
        ? todos.slice(0, 2).map((todo, index) => {
            return toDo(todo, index);
          })
        : todos
        ? todos.map((todo, index) => {
            if (todo.content) {
              return toDo(todo, index);
            }
          })
        : null}
    </>
  );
};

export default TodoComp;
