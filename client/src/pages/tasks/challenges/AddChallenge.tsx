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
  const { setChallengeAdded, getTasks } = props;
  const jobContext = useContext(JobContext);
  const { jobState, getJobs } = jobContext;
  const [job_id, setJobId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [challenge, setChallenge] = useState({
    url: "",
    name: "",
    repo: "",
    job_ref: "",
    due_date: "",
  });
  const [dateCheck, setDateCheck] = useState(false);
  const [sendDate, setSendDate] = useState("");
  const [jobList, setjobList] = useState([]);
  useEffect(() => {
    if (props.jobChallengeCheck) {
      setJobId(props.jobId);
    }
    setChallenge({ ...props.challenge });
  }, [props.challenge]);

  useEffect(() => {
    console.log(jobList)
  });

  const handleAddJobToChallenge = (e, job) => {
    e.preventDefault();
    setJobId(job.job_id);
    console.log(job_id);
  };

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
    console.log(dateCheck);

    console.log(sendDate);

    // Add Challenge to Job

    if (job_id) {
      let key = "challenge";
      let value = url;
      axiosPost(
        "/job-board/edit-job",
        { key, value, job_id },
        props.getJob,
        type
      );
    }
  };

  //Edit Challenge

  const editChallenge = (e) => {
    e.preventDefault();
    const url = challenge.url;
    const name = challenge.name;
    const repo = challenge.repo;
    let index = props.index;
    let type = "add";

    axiosPost(
      "/tasks/challenges/edit-challenge",
      { name, url, repo, job_id, sendDate, index },
      getTasks,
      type,
      setChallengeAdded,
      true
    );
    console.log("clicked");
  };

  const editValue = (e) => {
    if (e.target.name === "url") {
      var url = e.target.value;
      setChallenge((prevState) => ({ ...prevState, url: url }));
    }
    if (e.target.name === "name") {
      var name = e.target.value;
      setChallenge((prevState) => ({ ...prevState, name: name }));
    }
    if (e.target.name === "repo") {
      var repo = e.target.value;
      setChallenge((prevState) => ({ ...prevState, repo: repo }));
    }
    setChallenge((prevState) => ({ ...prevState, due_date: sendDate }));
    setChallenge((prevState) => ({ ...prevState, job_ref: job_id }));
  };

  const onJobSearch = (e) => {
    e.preventDefault();
    const array = []
    var input = e.target.value;
    const filteredJobs = jobState.filter(job=>{
      return job.company_name.toLowerCase().includes(input.toLowerCase())
    })
    console.log(filteredJobs)
    filteredJobs.map((job)=>{
      setjobList(filteredJobs);
    })
    console.log(jobList)
if(!input){
  setjobList([])
}
  };

  console.log(props);

  return (
    <>
      <form
        onSubmit={(e) =>
          props.editChallenge ? editChallenge(e) : addChallenge(e)
        }
      >
        <CardContent>
          <h3>{props.editChallenge ? "Edit Challenge" : "Add Challenge"}</h3>
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
                value: challenge.name,
              },
              {
                type: "text",
                id: "url",
                name: "url",
                label: "Url",
                required: true,
                value: challenge.url,
              },
              {
                type: "text",
                id: "repo",
                name: "repo",
                label: "Repo",
                required: true,
                value: challenge.repo,
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
                checked={
                  props.editChallenge && challenge.due_date !== ""
                    ? true
                    : dateCheck
                }
              ></input>
            </p>
            <DatePicker
              selected={
                props.editChallenge && challenge.due_date !== ""
                  ? new Date(challenge.due_date)
                  : startDate
              }
              onChange={(date) => {
                setStartDate(date);
                setSendDate(date);
              }}
            />
          </div>
          <div>
            <CardContent>
            {props.jobChallengeCheck ? (
              <div>
              <p>For Job:</p>
              <p>
                {props.jobChallengeTitle} at {props.jobChallengeCompany}
              </p>
              </div>
            ) : challenge.job_ref ? (
              jobState.map((job) => {
                if (String(job.job_id) === challenge.job_ref) {
                  return (
                      <a>{job.company_name}</a>
                  );
                }
              })
            ) : (
              <>
                <p>Is this challenge for a job you have saved?</p>
                <Form
                  mediumWidth
                  noSubmit
                  smallText
                  onChange={onJobSearch}
                  inputs={[
                    {
                      label: "Search Jobs",
                      type: "text",
                      id: "jobs",
                      name: "jobs",
                      required: true,
                    },
                  ]}
                />
                <div style={{margin:"20px"}}>
                {jobList.map((job, index) => {
                  return (
                    <button key={index} onClick={(e) => handleAddJobToChallenge(e, job)}>
                      {job.company_name}
                    </button>
                  );
                })}
                </div>
              </>
            )}
            </CardContent>
          </div>
        </CardContent>
      </form>
    </>
  );
};

export default AddChallenge;
