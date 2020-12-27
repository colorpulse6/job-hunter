import React, { useState, useContext } from "react";
import HardSkills from "./HardSkills";
import SoftSkills from "./SoftSkills";
import PrepNav from "../PrepNav";
import axios from "axios";
import config from "../../../config";
import { PreperationContext } from "../../../context/PreperationContext";

import {
  PageContainer,
  CardContainer,
  Card,
} from "../../../styles/styled-components/StyledContainers";



const Skills = () => {

  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
  const [skillList, setSkills] = useState([]);
  const [showSkills, setShowSkills] = useState(false);

  const fetchSkills = (input) => {
    var myHeaders = new Headers();

    myHeaders.append("apikey", "HeFoDL064Qy8AqVYO6nG2aKEUQQTJLR8");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(`https://api.promptapi.com/skills?q=${input}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setSkills(result);
      })
      .catch((error) => console.log("error", error));
  };


  const addSkill = (e, skill, skillType, slug) => {
    e.preventDefault();
      console.log(skill);
      axios
        .post(
          `${config.API_URL}/preperation/${skillType}/${slug}`,
          {
            skill,
          },
          { withCredentials: true }
        )
        .then((result) => {
          getPreperation();
          Array.from(document.querySelectorAll("input")).forEach(
            (input) => (input.value = "")
          );
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
  }
  const setInput = (e) => {
    e.preventDefault();
    var input = e.target.value;
    fetchSkills(input);
  };

  const removeSkill = (skill, skillType, slug) => {
    console.log(skill);
    axios
      .post(
        `${config.API_URL}/preperation/${skillType}/${slug}`,
        {
          skill,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getPreperation();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <PrepNav />
      <PageContainer flex withSecondNav column>
        <HardSkills  skillList={skillList} setInput={setInput} addSkill={addSkill} removeSkill={removeSkill} setShowSkills={setShowSkills} showSkills={showSkills}/>
        <SoftSkills  skillList={skillList} setInput={setInput} addSkill={addSkill} removeSkill={removeSkill} setShowSkills={setShowSkills} showSkills={showSkills}/>
      </PageContainer>
    </>
  );
};

export default Skills;
