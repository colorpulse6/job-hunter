import React from "react";
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
      <HeaderSecondary centerText>Challenges</HeaderSecondary>

        <InfoDiv
          state={taskState.challenges}
          element={"Challenges"}
          url="/tasks/challenges"
        />
      <HeaderSecondary centerText>Learning</HeaderSecondary>

        <InfoDiv
          state={taskState.learning}
          element={"Learning"}
          url="/tasks/learning"
        />
      </CardContainer>
    </>
  );
};

export default Tasks;
