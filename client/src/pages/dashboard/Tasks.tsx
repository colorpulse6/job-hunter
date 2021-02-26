import React from "react";
import { Link } from "react-router-dom";
import InfoDiv from "./InfoDiv";
import TodosComp from "../../components/TodoComp";
import { AddButton } from "../../styles/styled-components/StylesMain";
import AddButtonImg from "../../assets/add-button.png";
import { CardContainer } from "../../styles/styled-components/StyledContainers";
import { HeaderSecondary } from "../../styles/styled-components/StyledText";
import { DashboardTasksProps } from "../../interfaces";

const Tasks = (props: DashboardTasksProps) => {
  const { taskState, jobs, getTasks } = props;
  const { todos, challenges, learning } = props.taskState;
  return (
    <>
      <CardContainer large dashboard>
        <Link to="/tasks/todos">
          <HeaderSecondary>Todos</HeaderSecondary>
        </Link>
        <TodosComp
          todos={todos}
          deleteUrl="/tasks/todos/delete-todo"
          finishUrl="/tasks/todos/finish-todo"
          fetch={getTasks}
          limit
        />
        <div style={{ textAlign: "right", padding: "10px 15px" }}>
          {todos && todos.length > 2 ? (
            <Link to="/tasks/todos">And {todos.length - 2} more...</Link>
          ) : null}
        </div>
        {!todos || (todos && todos.length === 0) ? (
          <div style={{ marginLeft: "50px" }}>
            <Link to={"/tasks/todos"}>
              <AddButton src={AddButtonImg} dashBoard></AddButton>Add todos?
            </Link>
          </div>
        ) : null}

        <Link to="/tasks/challenges">
          <HeaderSecondary>Challenges</HeaderSecondary>
        </Link>

        <InfoDiv
          state={challenges}
          taskState={taskState}
          jobs={jobs}
          element="Challenges"
          url="/tasks/challenges"
        />
        {!challenges || (challenges && challenges.length === 0) ? (
          <div style={{ marginLeft: "50px" }}>
            <Link to={"/tasks/challenges"}>
              <AddButton src={AddButtonImg} dashBoard></AddButton>Add
              Challenges?
            </Link>
          </div>
        ) : null}

        <div style={{ textAlign: "right", padding: "10px 15px" }}>
          {challenges && challenges.length > 2 ? (
            <Link to="/tasks/challenges">
              And {challenges.length - 2} more...
            </Link>
          ) : null}
        </div>

        <Link to="/tasks/learning">
          <HeaderSecondary>Learning</HeaderSecondary>
        </Link>

        <InfoDiv
          state={learning}
          taskState={taskState}
          element={"Learning"}
          url="/tasks/learning"
        />
        {!learning || (learning && learning.length === 0) ? (
          <div style={{ marginLeft: "50px" }}>
            <Link to={"/tasks/learning"}>
              <AddButton src={AddButtonImg} dashBoard></AddButton>Add learning?
            </Link>
          </div>
        ) : null}

        <div style={{ textAlign: "right", padding: "10px 15px" }}>
          {learning && learning.length > 2 ? (
            <Link to="/tasks/learning">And {learning.length - 2} more...</Link>
          ) : null}
        </div>
      </CardContainer>
    </>
  );
};

export default Tasks;
