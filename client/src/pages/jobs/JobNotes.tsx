import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";
import { JobContext } from "../../context/JobContext";
import JobNav from "../../pages/jobs/JobNav"

const JobNotes = (props) => {
  const jobContext = useContext(JobContext);
  const { getJobDetail, jobDetail } = jobContext;
  const jobId = props.location.state.jobId

  useEffect(() => {
    document.getElementById("notesField").innerHTML = jobDetail.job_notes;
  });

  // useEffect(()=>{
  //   getJobDetail(jobId)
  // }, [])

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
        // getJobDetail(jobId)

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
    <>
      <JobNav />
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
    </>
  );
};

export default JobNotes;
