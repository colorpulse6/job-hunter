import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../../config";
import { Link } from "react-router-dom";
import { JobContext } from "../../context/JobContext";
import {
  PageContainer,
  JobColumnsStyled} from "../../styles/styled-components/StylesMain";
import JobCategory from "../../components/JobCategory";
import { Card, CardContent } from "../../styles/styled-components/StylesCard";
import JobBoardRender from "../../components/JobBoardRender"
interface IAddJob {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
}



export default function JobBoard(): JSX.Element {
  const jobContext = useContext(JobContext);

  const { jobState, getJobs } = jobContext;

  const [inputStar, setInputStar] = useState(false);
  const [renderStar, setRenderStar] = useState(false);

  // console.log(jobState);
  const handleStar = (e, job_id = null) => {
    e.preventDefault();
    if (e.target.checked) {
      if (e.target.id === "inputStar") {
        setInputStar(true);
      }
    }
    if (e.target.id === "renderStar") {
      if (renderStar === false) {
        setRenderStar(true);
      }
      if (renderStar === true) {
        setRenderStar(false);
      }
      changeStar(e, job_id);
    }
  };

  //Add Job
  const addJob = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let target = e.currentTarget as any;
    var values: IAddJob = {
      companyName: target.companyName.value,
      jobTitle: target.jobTitle.value,
      jobDescription: target.jobDescription.value,
    };
    const { companyName, jobTitle, jobDescription } = values;

    axios
      .post(
        `${config.API_URL}/job-board/add-job`,
        {
          companyName,
          jobTitle,
          jobDescription,
          inputStar,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getJobs();
        Array.from(document.querySelectorAll("input")).forEach((input) => {
          input.value = "";
          if (input.type === "checkbox" && input.id === "inputStar") {
            input.checked = false;
          }
        });
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  //Remove Job
  const removeJob = (job_id) => {
    console.log("in client");
    axios
      .post(
        `${config.API_URL}/job-board/delete-job`,
        {
          job_id,
        },
        { withCredentials: true }
      )
      .then(() => {
        getJobs();
        // console.log(job_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Change Job Category
  const changeStatus = (category, job_id) => {
    // console.log(index);
    console.log(category);
    let value = category;
    axios
      .post(
        `${config.API_URL}/job-board/set-status`,
        {
          value,
          job_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        getJobs();
        // console.log(jobState[index]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(jobState)

  //Change Star
  const changeStar = (e, job_id) => {
    console.log(renderStar);
    axios
      .post(
        `${config.API_URL}/job-board/set-star`,
        {
          renderStar,
          job_id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        getJobs();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // function allowDrop(ev) {
  //   ev.preventDefault();
  // }

  // function drag(ev, index, job_id, category) {
  //   let data = {event:ev.target.id, index, job_id, category}
  //   ev.dataTransfer.setData("text", JSON.stringify(data));
  //   document.querySelector(".dragon").classList.add("dragging")
  // }

  // function drop(ev) {
  //   ev.preventDefault();
  //   var data = JSON.parse(ev.dataTransfer.getData("text"));
  //   console.log(ev.target.id)
  //   let {event, index, job_id} = data
  //   // ev.target.appendChild(document.getElementById(event));
  //   changeStatus(ev.target.id, index, job_id,)
  // }

  return (
    
      <PageContainer column>
        {/* <Card id="div1" onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}></Card>

<img id="drag1" src={Logo} draggable="true" onDragStart={drag} width="336" height="69"></img>
<Card id="div1" onDrop={(event)=>drop(event)} onDragOver={(event)=>allowDrop(event)}></Card> */}

        {/* <h1>Add Job</h1> */}

        <Card job >
      <CardContent>
      <form onSubmit={(e) => addJob(e)}>
        <div>
          <input
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Company Name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            placeholder="Job Title"
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="jobDescription"
            name="jobDescription"
            placeholder="Description"
          />
        </div>
        <div>
          <input type="checkbox" id="inputStar" onChange={handleStar} />
          <p>Star Job?</p>
        </div>

        <div>
          <input type="submit" value="Add Job" />
        </div>
      </form>
      </CardContent>
      </Card>
      <JobColumnsStyled>
         <JobCategory changeStatus={changeStatus} handleStar={handleStar} removeJob={removeJob}/>
      </JobColumnsStyled>

        {/* <JobColumnsStyled>
          <JobCategory
            id1="job_saved"
            id2="drag1"
            title="Saved"
            drop={drop}
            allowDrop={allowDrop}
            drag={drag}
            handleStar={handleStar}
            category="job_saved"
          />

          <JobCategory
            id1="applied"
            id2="drag2"
            title="Applied"
            drop={drop}
            allowDrop={allowDrop}
            drag={drag}
            handleStar={handleStar}
            category="applied"
          />

          <JobCategory
            id1="incontact"
            id2="drag3"
            title="In Contact"
            drop={drop}
            allowDrop={allowDrop}
            drag={drag}
            handleStar={handleStar}
            category="incontact"
          />

          <JobCategory
            id1="interview1"
            id2="drag4"
            title="Interview 1"
            drop={drop}
            allowDrop={allowDrop}
            drag={drag}
            handleStar={handleStar}
            category="interview1"
          />

          <JobCategory
            id1="interview2"
            id2="drag5"
            title="Interview 2"
            drop={drop}
            allowDrop={allowDrop}
            drag={drag}
            handleStar={handleStar}
            category="interview2"
          />

          <JobCategory
            id1="interview3"
            id2="drag6"
            title="Interview 3"
            drop={drop}
            allowDrop={allowDrop}
            drag={drag}
            handleStar={handleStar}
            category="interview3"
          />

          <JobCategory
            id1="hired"
            id2="drag7"
            title="Hired"
            drop={drop}
            allowDrop={allowDrop}
            drag={drag}
            handleStar={handleStar}
            category="hired"
          />

          <JobCategory
            id1="denied"
            id2="drag8"
            title="Denied"
            drop={drop}
            allowDrop={allowDrop}
            drag={drag}
            handleStar={handleStar}
            category="denied"
          />

          <JobCategory
            id1="archived"
            id2="drag9"
            title="Archived"
            drop={drop}
            allowDrop={allowDrop}
            drag={drag}
            handleStar={handleStar}
            category="archived"
            removeJob={removeJob}
          />
        </JobColumnsStyled> */}

      </PageContainer>
  );
}
