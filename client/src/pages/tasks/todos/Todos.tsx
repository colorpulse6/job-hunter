import React, { useState, useEffect, useContext } from "react";
import { axiosPost } from "../../../javascript/fetchFunctions";
import { TaskContext } from "../../../context/TaskContext";
import TaskNav from "../TaskNav";
import AddTodo from "./AddTodo";
import TodosComp from "../../../components/TodoComp";
import Modal from "../../../components/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { PageContainer } from "../../../styles/styled-components/StyledContainers";

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
    let type = "add";

    axiosPost(
      "/tasks/todos/add-todo",
      { content, sendDate },
      getTasks,
      type,
      setTodoAdded,
      true
    );
  };
  console.log(taskState);
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
        />

        {/* <AddTodo
          setDateCheck={setDateCheck}
          dateCheck={dateCheck}
          startDate={startDate}
          setStartDate={setStartDate}
          addTodo={addTodo}
        /> */}

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
