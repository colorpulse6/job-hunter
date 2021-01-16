import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../../config";
import {
  PageContainer,
} from "../../../styles/styled-components/StyledContainers";

import { StyledTextField, StyledSubmit } from "../../../styles/styled-components/StyledElements"

const JobNotes = ({job, getJob}) => {

  const jobId = job.job_id

  useEffect(() => {
    document.getElementById("notesField").innerHTML = job.job_notes;
  });

  const [input, setInput] = useState("")

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const saveNotes = () => {
    let jobNotes = input;

    console.log(jobNotes);
    axios
      .post(
        `${config.API_URL}/job-board/job-detail/add-notes`,
        {
          jobNotes,
          jobId
        },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result.data);
        getJob()
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    saveNotes()
  };

  setTimeout(()=>{
    saveNotes()
  }, 60000)

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          name="jobNotes"
          id="notesField"
          placeholder="Type Notes Here"
          onChange={handleChange}
        />
        <StyledSubmit type="submit" value="Save Notes"></StyledSubmit>
      </form>
    </PageContainer>
  );
};

export default JobNotes;
