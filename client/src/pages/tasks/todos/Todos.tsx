import React, { useState, useEffect, useContext } from "react";
import { axiosPost } from "../../../javascript/fetchFunctions";
import { TaskContext } from "../../../context/TaskContext";
import TaskNav from "../TaskNav";
import TodosComp from "../../../components/TodoComp";
import "react-datepicker/dist/react-datepicker.css";
import {
  PageContainer,
  CardContainer,
  CardContent,
  Card,
} from "../../../styles/styled-components/StyledContainers";
import AddSingle from "../../../components/AddSingle";

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
      <PageContainer withSecondNav>
        <Card flex shadow roundedCorners noBorder center>
          <Card center noBorder>
            <AddSingle
              handleAddFunction={addTodo}
              title={"Add Todo"}
              id="content"
              name="content"
              addDate
              setDateCheck={setDateCheck}
              dateCheck={dateCheck}
              startDate={startDate}
              setStartDate={setStartDate}
              label="Add Todo"
            />
            <TodosComp
              todos={taskState.todos}
              deleteUrl="/tasks/todos/delete-todo"
              finishUrl="/tasks/todos/finish-todo"
              fetch={getTasks}
            />
          </Card>
        </Card>
      </PageContainer>
    </>
  );
};

export default Todos;
