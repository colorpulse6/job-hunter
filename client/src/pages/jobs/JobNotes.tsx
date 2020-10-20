import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";

const JobNotes = (props) => {
  useEffect(() => {
    document.getElementById("notesField").innerHTML = props.job.job_notes;
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
        },
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result.data);
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
    <div>
      <h1>Job Notes</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          name="jobNotes"
          id="notesField"
          placeholder="Type Notes Here"
          onChange={handleChange}
        ></textarea>
        <input type="submit" value="Save Notes"></input>
      </form>
    </div>
  );
};

export default JobNotes;
