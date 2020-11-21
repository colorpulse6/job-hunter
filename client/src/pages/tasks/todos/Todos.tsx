import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { TaskContext } from "../../../context/TaskContext";
import TaskNav from "../TaskNav";
import AddTodo from "./AddTodo";
import TodosComp from "../../../components/TodosComp";
import Modal from "../../../components/Modal";
import "react-datepicker/dist/react-datepicker.css";

import {
  PageContainer,
  CardContainer,
} from "../../../styles/styled-components/StyledContainers";

import { HeaderMain } from "../../../styles/styled-components/StyledText";

const Todos = () => {
  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;
  const [dateCheck, setDateCheck] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [sendDate, setSendDate] = useState("");
  const [todoAdded, setTodoAdded] = useState(false);

  useEffect(() => {
    if (dateCheck) {
      setSendDate(startDate.toISOString());
    }
    setTodoAdded(false);
  });

  const addTodo = (e) => {
    e.preventDefault();
    const content = e.target.content.value;

    axios
      .post(
        `${config.API_URL}/tasks/todos/add-todo`,
        {
          content,
          sendDate,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getTasks();
        Array.from(document.querySelectorAll("input")).forEach((input) => {
          input.value = "";
          if (input.type === "checkbox") {
            input.checked = false;
          }
        });
        setTodoAdded(true);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <>
      <TaskNav />
      <PageContainer>
        <Modal
          content={
            <AddTodo
              setDateCheck={setDateCheck}
              dateCheck={dateCheck}
              startDate={startDate}
              setStartDate={setStartDate}
              addTodo={addTodo}
            />
          }
          toggleOn={todoAdded}
          title={"Add Event"}
        />

        <HeaderMain centerText>Todos</HeaderMain>
        <TodosComp
          todos={taskState.todos}
          deleteUrl="/tasks/todos/delete-todo"
          finishUrl="/tasks/todos/finish-todo"
          fetch={getTasks}
        />
      </PageContainer>
    </>
  );
};

export default Todos;
