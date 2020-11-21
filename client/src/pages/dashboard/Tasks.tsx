import React from "react";
import InfoDiv from "./InfoDiv";
import TodosComp from "../../components/TodosComp";

import { CardContainer } from "../../styles/styled-components/StyledContainers";
import { HeaderMain } from "../../styles/styled-components/StyledText";

const Tasks = (props) => {
  const { taskState, getTasks } = props;
  return (
    <>
      <CardContainer large>
        <HeaderMain centerText>Tasks</HeaderMain>

        <TodosComp
          todos={taskState.todos}
          deleteUrl="/tasks/todos/delete-todo"
          finishUrl="/tasks/todos/finish-todo"
          fetch={getTasks}
        />

        <InfoDiv
          state={taskState.challenges}
          element={"Challenges"}
          url="/tasks/challenges"
        />

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
