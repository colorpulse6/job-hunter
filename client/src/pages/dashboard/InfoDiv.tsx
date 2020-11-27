import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter
} from "../../styles/styled-components/StyledContainers";

const InfoDiv = (props) => {
  let { state, jobs, element, url } = props;
  console.group(jobs);
  return (
    <Card flex noBorder center>
      {/* <h4>{element}</h4> */}
      {state && state.length > 0 ? (
        state.slice(0, 2).map((item, index) => {
          return item.completed === false ? (
            <CardContent key={index}>
              {element === "Challenges" ? (
                <Card flex column shorter  roundedCorners smallFont colored>
                  
                  <p style={{textAlign:"center"}}>
                    <strong>{item.name}</strong>
                  </p>
                  <a href={item.url} target="_blank">
                    {item.url}
                  </a>
                  <a href={item.repo} target="_blank">
                    {item.repo}
                  </a>
                  {jobs.map((job) => {
                    if (String(job.job_id) === item.job_ref) {
                      return <CardFooter>{job.company_name}</CardFooter>;
                    }
                  })}
                  
                </Card>
                
              ) : null}
              {element === "Learning" ? (
                <>
                  {/* <p>{item.name}</p> */}
                  <a href={item.tutorial_url} target="_blank">
                    {item.tutorial_url}
                  </a>{" "}
                </>
              ) : null}
            </CardContent>
          ) : null;
        })
      ) : (
        <div>
          <p>No {element}...</p>
          <Link to={`${url}`}>Add {element}?</Link>
        </div>
      )}
    </Card>
  );
};

export default InfoDiv;
