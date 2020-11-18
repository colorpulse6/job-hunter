import React, { useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";
import TodosComp from "../../components/tasks/todos/TodosComp";
import { JobContext } from "../../context/JobContext";
import JobNav from "../../pages/jobs/JobNav";

import { CountCircle } from "../../styles/styled-components/StylesCard"

const JobTasks = (props) => {
  const jobContext = useContext(JobContext);
  const { getJobDetail, jobDetail } = jobContext;
  const jobId = props.location.state.jobId;

  // useEffect(()=>{
  //   getJobDetail(jobId)
  // }, [])

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
        getJobDetail(jobId);
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
    <div>
      <JobNav />
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
        todos={jobDetail.job_tasks}
        deleteUrl="/job-board/job-detail/delete-task"
        finishUrl="/job-board/job-detail/finish-task"
        fetch={getJobDetail}
      />
    </div>
  );
};

export default JobTasks;
