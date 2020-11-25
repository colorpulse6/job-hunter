import React from "react";
import { Link } from 'react-router-dom'
import InfoDiv from "./InfoDiv";
import TodosComp from "../../components/TodoComp";

import { CardContainer } from "../../styles/styled-components/StyledContainers";
import { HeaderSecondary } from "../../styles/styled-components/StyledText";


const Tasks = (props) => {
  const { taskState, getTasks } = props;
  return (
    <>
      <CardContainer large>
      <HeaderSecondary centerText>Todos</HeaderSecondary>
        <TodosComp
          todos={taskState.todos}
          deleteUrl="/tasks/todos/delete-todo"
          finishUrl="/tasks/todos/finish-todo"
          fetch={getTasks}
        />
        {taskState.todos.length > 2 ? <Link to="/tasks/todos" >And {taskState.todos.length  - 2} more</Link> : null}
      <HeaderSecondary centerText>Challenges</HeaderSecondary>

        <InfoDiv
          state={taskState.challenges}
          element={"Challenges"}
          url="/tasks/challenges"
        />
        {taskState.challenges.length > 2 ? <Link to="/tasks/challenges">And {taskState.challenges.length  - 2} more</Link> : null}
      <HeaderSecondary centerText>Learning</HeaderSecondary>

        <InfoDiv
          state={taskState.learning}
          element={"Learning"}
          url="/tasks/learning"
        />
        {taskState.learning.length > 2 ? <Link to="/tasks/todos">And {taskState.learning.length  - 2} more</Link> : null}
      </CardContainer>
    </>
  );
};

export default Tasks;
