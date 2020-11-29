import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../javascript/DateFunctions"

import {
  Card,
  CardContent,
  CardFooter,
  Flex
} from "../../styles/styled-components/StyledContainers";
import { StyledIcon, StyledButton } from "../../styles/styled-components/StyledElements";

import { HeaderSecondary } from "../../styles/styled-components/StyledText"
import RepoIcon from "../../assets/repo-icon.png"
import UrlIcon from "../../assets/url-icon.png"
import JobIcon from "../../assets/job-icon.png"

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
                <Card flex column shorter roundedCorners smallFont shadow>
                  
                  <HeaderSecondary paddingBottom noPadding smallFont centerText>
                    <strong>{item.name}</strong>
                   
                  </HeaderSecondary>
                  <hr></hr>
                  {jobs.map((job) => {
                    if (String(job.job_id) === item.job_ref) {
                      return <div>
                        <StyledIcon src={JobIcon} tiny paddingRight ></StyledIcon>

                        <a>{job.company_name}</a>
                        </div>
                    }
                  })}
                  <div>
                  <StyledIcon src={UrlIcon} tiny paddingRight  ></StyledIcon>
                  <a href={item.url} target="_blank">
                    Challenge Url
                  </a>
                  </div>
                  
                  <div>
                    <StyledIcon src={RepoIcon} tiny paddingRight ></StyledIcon>
                    <a href={item.repo} target="_blank">
                    Personal Repo
                  </a>
                  
                  </div>
                <StyledButton  small noDisplay>{item.due_date !== "" ? formatDate(item.due_date) : null}</StyledButton>
                  
                 
                  
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
