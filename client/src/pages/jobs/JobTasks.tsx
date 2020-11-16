import React from "react";
import axios from "axios";
import config from "../../config";
import TodosComp from "../../components/tasks/todos/TodosComp";
import { CountCircle } from "../../styles/styled-components/StylesCard"

const JobTasks = (props) => {
  console.log(props.job);

  const addJobTask = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    let jobId = props.job.job_id;

    console.log(content);

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
        props.getJob();
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
        todos={props.job.job_tasks}
        deleteUrl="/job-board/job-detail/delete-task"
        finishUrl="/job-board/job-detail/finish-task"
        fetch={props.getJob}
      />
    </div>
  );
};

export default JobTasks;
