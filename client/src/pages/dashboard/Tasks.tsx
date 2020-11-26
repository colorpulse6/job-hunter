import React from "react";
import { Link } from "react-router-dom";
import InfoDiv from "./InfoDiv";
import TodosComp from "../../components/TodoComp";

import {
  CardContainer,
  Flex,
} from "../../styles/styled-components/StyledContainers";
import { HeaderSecondary } from "../../styles/styled-components/StyledText";

const Tasks = (props) => {
  const { taskState, getTasks } = props;
  const { todos, challenges, learning } = props.taskState;
  return (
    <>
      <CardContainer large>
        <HeaderSecondary centerText>Todos</HeaderSecondary>
        <TodosComp
          todos={todos}
          deleteUrl="/tasks/todos/delete-todo"
          finishUrl="/tasks/todos/finish-todo"
          fetch={getTasks}
        />
        <div style={{ textAlign: "right", padding:"10px 15px" }}>
          {todos && todos.length > 2 ? (
            <Link to="/tasks/todos">And {todos.length - 2} more...</Link>
          ) : null}
        </div>

        <HeaderSecondary centerText>Challenges</HeaderSecondary>

        <InfoDiv
          state={challenges}
          element={"Challenges"}
          url="/tasks/challenges"
        />
        <div style={{ textAlign: "right", padding:"10px 15px" }}>
          {challenges && challenges.length > 2 ? (
            <Link to="/tasks/challenges">
              And {challenges.length - 2} more...
            </Link>
          ) : null}
        </div>
        <HeaderSecondary centerText>Learning</HeaderSecondary>

        <InfoDiv state={learning} element={"Learning"} url="/tasks/learning" />
        <div style={{ textAlign: "right", padding:"10px 15px" }}>
          {learning && learning.length > 2 ? (
            <Link to="/tasks/todos">And {learning.length - 2} more...</Link>
          ) : null}
        </div>
      </CardContainer>
    </>
  );
};

export default Tasks;
