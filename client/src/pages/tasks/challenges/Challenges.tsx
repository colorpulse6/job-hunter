import React, { useState, useEffect, useContext } from "react";
import { axiosPost } from "../../../javascript/fetchFunctions";

import { TaskContext } from "../../../context/TaskContext";
import "react-datepicker/dist/react-datepicker.css";
import TaskNav from "../TaskNav";
import Modal from "../../../components/Modal";
import AddChallenge from "./AddChallenge";
import ChallengeComp from "./ChallengeComp";

import { PageContainer } from "../../../styles/styled-components/StyledContainers";

const Challenges = () => {
  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;
  const [challengeAdded, setChallengeAdded] = useState(false);

  const removeChallenge = (index) => {
    let type = "remove"
    axiosPost( "/tasks/challenges/delete-challenge", {index}, getTasks,type)

  };

 

  return (
    <>
      <TaskNav />
      <PageContainer withSecondNav>
        <Modal
          content={
            <AddChallenge
             challengeAdded={challengeAdded}
             setChallengeAdded={setChallengeAdded}
             getTasks={getTasks}
            />
          }
          toggleOn={challengeAdded}
        />

        <ChallengeComp removeChallenge={removeChallenge} taskState={taskState} getTasks={getTasks} />
      </PageContainer>
    </>
  );
};

export default Challenges;
