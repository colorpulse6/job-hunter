import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import TodosComp from "../../../components/TodoComp";
import Form from "../../../components/Form";
import {
  StyledForm,
  StyledButton,
} from "../../../styles/styled-components/StyledElements";
import { PageContainer, Card } from "../../../styles/styled-components/StyledContainers";

const JobTasks = ({ job, getJob }) => {
  const [buttonVisible, setButton] = useState(false)
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
      {/* <form onSubmit={(e) => addJobTask(e)}>
        <input
          type="text"
          id="content"
          name="content"
          placeholder="Content"
          required
        />
        <input type="submit" value="Add Task" />
      </form> */}

      <StyledForm noBackground row onSubmit={(e) => {addJobTask(e);
         setButton(false)}} style={{marginBottom:"50px"}}>
        <Form
          title="Add Task"
          smallText
          auth
          noSubmit
          onClick={()=>setButton(true)}
          inputs={[
            {
              label: "Add Task",
              type: "text",
              id: "content",
              name: "content",
              required: true,
            },
          ]}
        />
        {buttonVisible ? <StyledButton offColor small type="submit" style={{marginTop:"15px"}}>Add Task</StyledButton> : null}
        
      </StyledForm>

      <TodosComp
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
