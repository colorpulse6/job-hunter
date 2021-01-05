import React, { useEffect, useState, useContext } from "react";
import {
  CardContainer,
  CardContent,
} from "../../../styles/styled-components/StyledContainers";
import DatePicker from "react-datepicker";
import { axiosPost } from "../../../javascript/fetchFunctions";
import { JobContext } from "../../../context/JobContext";

import Form from "../../../components/Form";

const AddChallenge = (props) => {
  const { challengeAdded, setChallengeAdded, getTasks } = props;
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
    if (props.jobChallengeCheck) {
      setJobId(props.jobId);
    }
  });

  const addChallenge = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const url = e.target.url.value;
    const repo = e.target.repo.value;
    let type = "add";

    axiosPost(
      "/tasks/challenges/add-challenge",
      { name, url, repo, job_id, sendDate },
      getTasks,
      type,
      setChallengeAdded,
      true
    );

    // Add Challenge to Job

    if (job_id) {
      let key = "challenge";
      let value = url;
      axiosPost("/job-board/edit-job", { key, value, job_id }, props.getJob);
    }
  };
  return (
    <>
      <form onSubmit={(e) => addChallenge(e)}>
        <CardContent>
          <h3>Add Challenge</h3>
          <Form
            auth
            smallText
            inputs={[
              {
                type: "text",
                id: "name",
                name: "name",
                label: "Title",
                required: true,
              },
              {
                type: "text",
                id: "url",
                name: "url",
                label: "Url",
                required: true,
              },
              {
                type: "text",
                id: "repo",
                name: "repo",
                label: "Repo",
                required: false,
              }, 
            ]}
          />
         
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
            For Job:{" "}
            {props.jobChallengeCheck ? (
              <p>
                {props.jobChallengeTitle} at {props.jobChallengeCompany}
              </p>
            ) : (
              <>
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
              </>
            )}
          </div>
        </CardContent>
      </form>
    </>
  );
};

export default AddChallenge;
