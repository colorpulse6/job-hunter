import React, { useContext, useState } from "react";
import axios from "axios";
import config from "../../../config";
import { PreperationContext } from "../../../context/PreperationContext";
import PrepNav from "../PrepNav";

import {
  CardContainer,
  Card,
} from "../../../styles/styled-components/StyledContainers";
import { HeaderMain } from "../../../styles/styled-components/StyledText";
const SoftSkills = (props) => {
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
        <HeaderMain>Soft Skills</HeaderMain>

        <input
          onChange={(e) => {
            setInput(e);
            setShowSkills(true);
          }}
          placeholder="Search Skills"
          required
        ></input>

        <div>
          {skillList.length > 0 && showSkills
            ? skillList.map((skillItem, index) => {
                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      addSkill(e, skillItem, "soft-skills", "add-soft-skill");
                      setShowSkills(false);
                    }}
                  >
                    {skillItem}
                  </button>
                );
              })
            : null}
          {preperationState.soft_skills
            ? preperationState.soft_skills.map((skill) => {
                return (
                  <div>
                    <p>{skill}</p>
                    <button
                      onClick={() =>
                        removeSkill(skill, "soft-skills", "delete-soft-skill")
                      }
                    >
                      X
                    </button>
                  </div>
                );
              })
            : null}
        </div>
      </CardContainer>
    </>
  );
};

export default SoftSkills;
