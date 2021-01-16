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
  const [challenge, setChallenge] = useState({url:"", name:"", repo:"", job_ref:""})
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
      setChallenge({...props.challenge})

   

  
    
  }, []);

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

  //Edit Challenge

  const editChallenge = (e) => {
    e.preventDefault();
    const url = challenge.url;
    const name = challenge.name;
    const repo = challenge.repo;
    let index = props.index
    let type = "add";

    axiosPost(
      "/tasks/challenges/edit-challenge",
      { name, url, repo, job_id, sendDate, index },
      getTasks,
      type,
      setChallengeAdded,
      true
    );
    
  };

  const editValue = (e) => {
   
    if(e.target.name === "url") {
      var url = e.target.value
      setChallenge(prevState=>({...prevState, url:url}))

    }
    if(e.target.name === "name") {
      var name = e.target.value
      setChallenge(prevState=>({...prevState, name:name}))

    }
    if(e.target.name === "repo") {
      var repo = e.target.value
      setChallenge(prevState=>({...prevState, repo:repo}))

    }

    console.log(repo)
   
  }

console.log(props)

  return (
    <>
      <form onSubmit={(e) => props.editChallenge ? editChallenge(e) : addChallenge(e)}>
        <CardContent>
          <h3>{props.editChallenge ? "Edit Challenge":"Add Challenge"}</h3>
          <Form
            auth={!props.editChallenge}
            smallText
            title={props.editChallenge ? "Save" : null}
            onChange={editValue}
            inputs={[
              {
                type: "text",
                id: "name",
                name: "name",
                label: "Title",
                required: true,
                value:challenge.name 
              },
              {
                type: "text",
                id: "url",
                name: "url",
                label: "Url",
                required: true,
                value:challenge.url
              },
              {
                type: "text",
                id: "repo",
                name: "repo",
                label: "Repo",
                required: true,
                value:challenge.repo
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
