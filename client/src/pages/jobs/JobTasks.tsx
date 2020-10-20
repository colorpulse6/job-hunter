import React from "react";
import axios from "axios";
import config from "../../config";

const JobTasks = (props) => {
  console.log(props.job)
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
          jobId
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

  const removeJobTask = (index, job_id) => {
    console.log(index);
    axios
      .post(
        `${config.API_URL}/job-board/job-detail/delete-task`,
        {
          index,
          job_id
        },
        { withCredentials: true }
      )
      .then((result) => {
        props.getJob();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
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

      {props.job.job_tasks
          ? props.job.job_tasks.map((task, index) => {
              return (
                <div key={index}>
                  <p>{task.content}</p>
                  <button onClick={() => removeJobTask(index, props.job.job_id)}>X</button>
                </div>
              );
            })
          : null}
    </div>
  );
};

export default JobTasks;
