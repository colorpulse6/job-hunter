import React, { useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";
import TodosComp from "../../components/tasks/todos/TodosComp";
import { JobContext } from "../../context/JobContext";
import JobNav from "../../pages/jobs/JobNav";

import { CountCircle } from "../../styles/styled-components/StylesCard"

const JobTasks = ({job, getJob}) => {
  const jobContext = useContext(JobContext);
  const { getJobDetail } = jobContext;
  const jobId = job.job_id

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
    <div>
      {/* <JobNav /> */}
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
    </div>
  );
};

export default JobTasks;
