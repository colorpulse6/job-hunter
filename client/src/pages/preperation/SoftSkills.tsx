import React, { useContext, useState } from "react";
import axios from "axios";
import config from "../../config";
import { PreperationContext } from "../../context/PreperationContext";
import PrepNav from "./PrepNav";

import { PageContainer } from "../../styles/styled-components/StyledContainers";

const SoftSkills = () => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
  const [skills, setSkills] = useState([]);

  const fetchSoftSkills = (input) => {
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

  const setInput = (e) => {
    e.preventDefault();
    var input = e.target.value;
    fetchSoftSkills(input);
  };

  const addSoftSkill = (e, skill) => {
    e.preventDefault();
    console.log(skill);
    axios
      .post(
        `${config.API_URL}/preperation/soft-skills/add-soft-skill`,
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
  };

  const removeSoftSkill = (skill) => {
    console.log(skill);
    axios
      .post(
        `${config.API_URL}/preperation/soft-skills/delete-soft-skill`,
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
      <PageContainer withSecondNav>
        <input onChange={setInput} placeholder="Search Skills" required></input>

        <div>
          {skills.length > 0
            ? skills.map((skill) => {
                return (
                  <button onClick={(e) => addSoftSkill(e, skill)}>
                    {skill}
                  </button>
                );
              })
            : null}
          {preperationState.soft_skills
            ? preperationState.soft_skills.map((skill) => {
                return (
                  <div>
                    <p>{skill}</p>
                    <button onClick={() => removeSoftSkill(skill)}>X</button>
                  </div>
                );
              })
            : null}
        </div>
      </PageContainer>
    </>
  );
};

export default SoftSkills;
