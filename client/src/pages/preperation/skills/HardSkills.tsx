import React, { useContext, useState } from "react";
import axios from "axios";
import config from "../../../config";
import { PreperationContext } from "../../../context/PreperationContext";
import PrepNav from "../PrepNav";
import {
  PageContainer,
  CardContainer,
  Card,
} from "../../../styles/styled-components/StyledContainers";
import { HeaderMain } from "../../../styles/styled-components/StyledText";

interface IFetch {
  uuid: string;
  skill_name: string;
}
const HardSkills = (props): JSX.Element => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
  let {
    skillList,
    setInput,
    addSkill,
    removeSkill,
    setShowSkills,
    showSkills,
  } = props;

  return (
    <>
      <CardContainer medium>
        <HeaderMain>Hard Skills</HeaderMain>
        <input
          onChange={(e) => {
            setInput(e);
            setShowSkills(true);
          }}
          placeholder="Search Skills"
          required
        ></input>

        {skillList.length > 0 && showSkills
          ? skillList.map((skillItem, index) => {
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    addSkill(e, skillItem, "hard-skills", "add-hard-skill");
                    setShowSkills(false);
                  }}
                >
                  {skillItem}
                </button>
              );
            })
          : null}
        {preperationState.hard_skills
          ? preperationState.hard_skills.map((skill, index) => {
              return (
                <div key={index}>
                  <p>{skill}</p>
                  <button
                    onClick={() =>
                      removeSkill(skill, "hard-skills", "delete-hard-skill")
                    }
                  >
                    X
                  </button>
                </div>
              );
            })
          : null}
      </CardContainer>
    </>
  );
};

export default HardSkills;
