import React, { useState, useEffect, useContext } from "react";
import { axiosPost } from "../../../javascript/fetchFunctions";
import { TaskContext } from "../../../context/TaskContext";
import "react-datepicker/dist/react-datepicker.css";
import TaskNav from "../TaskNav";
import Modal from "../../../components/Modal";
import LearningComp from "./LearningComp";
import { PageContainer } from "../../../styles/styled-components/StyledContainers";

import AddLearning from "./AddLearning";
import { HeaderMain } from "../../../styles/styled-components/StyledText";

const Learning = () => {
  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;
  const [startDate, setStartDate] = useState(new Date());
  const [dateCheck, setDateCheck] = useState(false);
  const [sendDate, setSendDate] = useState("");
  const [learningAdded, setLearningeAdded] = useState(false);

  useEffect(() => {
    if (dateCheck) {
      setSendDate(startDate.toISOString());
    }
    setLearningeAdded(false);
  });

  const addLearning = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const tutorialUrl = e.target.tutorialUrl.value;
    let type = "add";

    axiosPost(
      
      "/tasks/learning/add-learning",
      { name, tutorialUrl, sendDate },
      getTasks,
      type,
      setLearningeAdded,
      true,
      
    );
  };

  const removeLearning = (index) => {
    let type = "remove";
    axiosPost( "/tasks/learning/delete-learning", { index }, getTasks, type);
  };

  return (
    <>
      <TaskNav />
      <PageContainer withSecondNav>
        <Modal
          content={
            <AddLearning
              addLearning={addLearning}
              setDateCheck={setDateCheck}
              dateCheck={dateCheck}
              startDate={startDate}
              setStartDate={setStartDate}
            />
          }
          toggleOn={learningAdded}
        />

        <div>
          <HeaderMain>Learning</HeaderMain>
          <LearningComp taskState={taskState} removeLearning={removeLearning} />
        </div>
      </PageContainer>
    </>
  );
};

export default Learning;
