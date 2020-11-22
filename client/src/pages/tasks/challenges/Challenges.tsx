import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { TaskContext } from "../../../context/TaskContext";
import { JobContext } from "../../../context/JobContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskNav from "../TaskNav";
import Modal from "../../../components/Modal";
import AddChallenge from "./AddChallenge";
import ChallengeComp from "./ChallengeComp";
import { HeaderMain } from "../../../styles/styled-components/StyledText";

import { PageContainer, CardContainer } from "../../../styles/styled-components/StyledContainers";

const Challenges = () => {
  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;

  const jobContext = useContext(JobContext);
  const { jobState } = jobContext;
  console.log(taskState);

  const [job_id, setJobId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [dateCheck, setDateCheck] = useState(false);
  const [sendDate, setSendDate] = useState("");
  const [challengeAdded, setChallengeAdded] = useState(false);

  useEffect(() => {
    if (dateCheck) {
      setSendDate(startDate.toISOString());
      console.log(sendDate);
      setChallengeAdded(false);
    }
  });

  const addChallenge = (e) => {
    e.preventDefault();
    // let target = e.currentTarget as any;
    const name = e.target.name.value;
    const url = e.target.url.value;
    const repo = e.target.repo.value;

    axios
      .post(
        `${config.API_URL}/tasks/challenges/add-challenge`,
        {
          name,
          url,
          repo,
          job_id,
          sendDate,
        },
        { withCredentials: true }
      )
      .then(() => {
        getTasks();
        Array.from(document.querySelectorAll("input")).forEach((input) => {
          input.value = "";
          if (input.type === "checkbox") {
            input.checked = false;
          }
        });
        setChallengeAdded(true);
      })
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
            <AddChallenge
              addChallenge={addChallenge}
              setDateCheck={setDateCheck}
              dateCheck={dateCheck}
              startDate={startDate}
              setStartDate={setStartDate}
              jobState={jobState}
              setJobId={setJobId}
            />
          }
          toggleOn={challengeAdded}
        />
        
          <HeaderMain>Challenges</HeaderMain>
          <ChallengeComp taskState={taskState} getTasks={getTasks} />
        
      </PageContainer>
    </>
  );
};

export default Challenges;
