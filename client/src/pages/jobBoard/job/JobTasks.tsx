import React from "react";
import axios from "axios";
import config from "../../../config";
import TodosComp from "../../../components/TodoComp";
import {
  PageContainer,
  Card,
} from "../../../styles/styled-components/StyledContainers";
import AddSingle from "../../../components/AddSingle";

const JobTasks = ({ job, getJob }) => {
  const jobId = job.job_id;

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
      <AddSingle
        handleAddFunction={addJobTask}
        title="Add Task"
        id="content"
        name="content"
        label="Add Task"
      />

      <TodosComp
        secondLineColor
        noDate
        todos={job.job_tasks}
        deleteUrl="/job-board/job-detail/delete-task"
        finishUrl="/job-board/job-detail/finish-task"
        fetch={getJob}
      />
    </PageContainer>
  );
};

export default JobTasks;
