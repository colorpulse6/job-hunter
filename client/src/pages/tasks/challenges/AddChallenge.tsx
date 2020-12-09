import React, { useEffect, useState, useContext } from "react";
import {
  CardContainer,
  CardContent,
} from "../../../styles/styled-components/StyledContainers";
import DatePicker from "react-datepicker";
import { axiosPost } from "../../../javascript/fetchFunctions";
import { JobContext } from "../../../context/JobContext";
const AddChallenge = (props) => {
  
  const { challengeAdded, setChallengeAdded, getTasks } = props
  const jobContext = useContext(JobContext);
  const { jobState } = jobContext;
  const [job_id, setJobId] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [dateCheck, setDateCheck] = useState(false);
  const [sendDate, setSendDate] = useState("");
 

  useEffect(() => {
    if (dateCheck) {
      setSendDate(startDate.toISOString());
      setChallengeAdded(false);
    }
  });

  const addChallenge = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const url = e.target.url.value;
    const repo = e.target.repo.value;
    let type = "add"

    axiosPost(
      
      "/tasks/challenges/add-challenge",
      { name, url, repo, job_id, sendDate },
      getTasks,
      type,
      setChallengeAdded,
      true,
      
    );
  };
  return (
    <>
      <div onSubmit={(e) => addChallenge(e)}>
          <CardContent >
            <form>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
              <input
                type="text"
                id="url"
                name="url"
                placeholder="Url"
                required
              />
              <input
                type="text"
                id="repo"
                name="repo"
                placeholder="Repo"
                required
              />

              <input type="submit" value="Add Challenge" />
            </form>
            <div>
              <p>
                Select Deadline?
                <input
                  type="checkbox"
                  onChange={() => {
                    setDateCheck(!dateCheck);
                  }}
                ></input>
              </p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div>
              <p>Is this challenge for a job you have saved?</p>
              {jobState
                ? jobState.map((job) => {
                    return (
                      <button onClick={() => setJobId(job.job_id)}>
                        {job.job_title} at {job.company_name}
                      </button>
                    );
                  })
                : null}
            </div>
          </CardContent>
      </div>
    </>
  );
};

export default AddChallenge;
