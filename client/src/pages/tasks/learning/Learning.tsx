import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { TaskContext } from "../../../context/TaskContext";
import "react-datepicker/dist/react-datepicker.css";
import TaskNav from "../TaskNav"
import Modal from "../../../components/Modal";
import LearningComp from "./LearningComp"
import {
  PageContainer,
  CardContainer
} from "../../../styles/styled-components/StyledContainers";



import AddLearning from "./AddLearning"
import { HeaderMain } from "../../../styles/styled-components/StyledText";

const Learning = () => {
  
    const taskContext = useContext(TaskContext);
    const { taskState, getTasks } = taskContext;
    console.log(taskState.learning);

    const [startDate, setStartDate] = useState(new Date());
    const [dateCheck, setDateCheck] = useState(false);
    const [sendDate, setSendDate] = useState("");
    const [learningAdded, setLearningeAdded] = useState(false);

    useEffect(() => {
      if (dateCheck) {
        console.log("SEND IT!");
        setSendDate(startDate.toISOString())
        console.log(sendDate);
      }
      setLearningeAdded(false)
    });

    const addLearning = (e) => {
      e.preventDefault();
      // let target = e.currentTarget as any;
      const name = e.target.name.value;
      const tutorialUrl = e.target.tutorialUrl.value;

      axios
        .post(
          `${config.API_URL}/tasks/learning/add-learning`,
          {
            name,
            tutorialUrl,
            sendDate
          },
          { withCredentials: true }
        )
        .then((result) => {
          getTasks()
          Array.from(document.querySelectorAll("input")).forEach((input) => {
            input.value = "";
            if (input.type === "checkbox") {
              input.checked = false;
            }
          });
          setLearningeAdded(true)        })
        .catch((err) => {
          console.log(err.response.data.error);
        });   
    };

    

    return (
      <>
        <TaskNav />
        <PageContainer withSecondNav>
        <Modal
          content={
            <AddLearning
            addLearning={addLearning} setDateCheck={setDateCheck} dateCheck={dateCheck} startDate={startDate} setStartDate={setStartDate}
            />
          }
          toggleOn={learningAdded}
        />
      
        <div>
          <HeaderMain>Learning</HeaderMain>
          <LearningComp taskState={taskState} getTasks={getTasks} />
        </div>
      </PageContainer>
      </>

    );
 
};

export default Learning;
