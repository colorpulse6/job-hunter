import React from "react";
import { Link } from "react-router-dom";
import InfoDiv from "./InfoDiv";
import TodosComp from "../../components/TodoComp";

import {
  CardContainer,
  Card,
  Flex,
  CardContent,
} from "../../styles/styled-components/StyledContainers";
import { HeaderSecondary } from "../../styles/styled-components/StyledText";

const Tasks = (props) => {
  const { taskState, getTasks, jobs } = props;
  const { todos, challenges, learning } = props.taskState;
  return (
    <>
      <CardContainer large >
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
        {todos && todos.length === 0 ? (
          <div style={{textAlign:"center", marginLeft:"-10px"}}>
            <Link to={"/tasks/todos"}>Add Todos?</Link>
          </div>
        ) : null}

        <Link to="/tasks/challenges">
          <HeaderSecondary>Challenges</HeaderSecondary>
        </Link>

        <InfoDiv
          state={challenges}
          jobs={jobs}
          element="Challenges"
          url="/tasks/challenges"
          taskState={taskState}
        />
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
            
        <InfoDiv state={learning} element={"Learning"} url="/tasks/learning" />
        
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
