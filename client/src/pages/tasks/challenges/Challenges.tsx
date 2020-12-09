import React, { useState, useEffect, useContext } from "react";
import { axiosPost } from "../../../javascript/fetchFunctions";

import axios from "axios";
import config from "../../../config";
import { TaskContext } from "../../../context/TaskContext";
import { JobContext } from "../../../context/JobContext";
import "react-datepicker/dist/react-datepicker.css";
import TaskNav from "../TaskNav";
import Modal from "../../../components/Modal";
import AddChallenge from "./AddChallenge";
import ChallengeComp from "./ChallengeComp";
import { HeaderMain } from "../../../styles/styled-components/StyledText";

import { PageContainer } from "../../../styles/styled-components/StyledContainers";

const Challenges = () => {
  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;

  // const jobContext = useContext(JobContext);
  // const { jobState } = jobContext;

  // const [job_id, setJobId] = useState("");
  // const [startDate, setStartDate] = useState(new Date());
  // const [dateCheck, setDateCheck] = useState(false);
  // const [sendDate, setSendDate] = useState("");
  // const [challengeAdded, setChallengeAdded] = useState(false);

  // useEffect(() => {
  //   if (dateCheck) {
  //     setSendDate(startDate.toISOString());
  //     setChallengeAdded(false);
  //   }
  // });

  // const addChallenge = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name.value;
  //   const url = e.target.url.value;
  //   const repo = e.target.repo.value;
  //   let type = "add"

  //   axiosPost(
      
  //     "/tasks/challenges/add-challenge",
  //     { name, url, repo, job_id, sendDate },
  //     getTasks,
  //     type,
  //     setChallengeAdded,
  //     true,
      
  //   );
  // };

  const removeChallenge = (index) => {
    let type = "remove"
    axiosPost( "/tasks/challenges/delete-challenge", {index}, getTasks,type)

    // axios
    //   .post(
    //     `${config.API_URL}/tasks/challenges/delete-challenge`,
    //     {
    //       index,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then(() => {
    //     getTasks();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const [challengeAdded, setChallengeAdded] = useState(false);

 

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

        <HeaderMain>Challenges</HeaderMain>
        <ChallengeComp removeChallenge={removeChallenge} taskState={taskState} />
      </PageContainer>
    </>
  );
};

export default Challenges;
