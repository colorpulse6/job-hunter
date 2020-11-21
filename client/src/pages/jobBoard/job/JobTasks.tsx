import React, { useEffect, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import TodosComp from "../../../components/TodosComp";


import {
  PageContainer,
} from "../../../styles/styled-components/StyledContainers";

const JobTasks = ({job, getJob}) => {
  const jobId = job.job_id

  const addJobTask = (e) => {
    e.preventDefault();
    const content = e.target.content.value;

    axios
      .post(
        `${config.API_URL}/job-board/job-detail/add-task`,
        {
          content,
          jobId,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getJob();
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <PageContainer>
      <form onSubmit={(e) => addJobTask(e)}>
        <input
          type="text"
          id="content"
          name="content"
          placeholder="Content"
          required
        />
        <input type="submit" value="Add Task" />
      </form>
      <TodosComp
        todos={job.job_tasks}
        deleteUrl="/job-board/job-detail/delete-task"
        finishUrl="/job-board/job-detail/finish-task"
        fetch={getJob}
      />
    </PageContainer>
  );
};

export default JobTasks;
