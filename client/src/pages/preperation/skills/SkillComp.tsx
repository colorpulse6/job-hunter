import React from "react";

import {
  PageContainer,
  CardContainer,
  Card,
} from "../../../styles/styled-components/StyledContainers";
import { HeaderMain } from "../../../styles/styled-components/StyledText";

const SkillComp = (props): JSX.Element => {
  let {
    title,
    skillList,
    setInput,
    addSkill,
    removeSkill,
    setShowSkills,
    showSkills,
    skillType,
    slug,
    deleteSlug,
    skillState,
  } = props;

  return (
    <>
      <CardContainer medium>
        <HeaderMain>{title}</HeaderMain>
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
                    addSkill(e, skillItem, skillType, slug);
                    setShowSkills(false);
                  }}
                >
                  {skillItem}
                </button>
              );
            })
          : null}
        {skillState
          ? skillState.map((skill, index) => {
              return (
                <div key={index}>
                  <p>{skill}</p>
                  <button
                    onClick={() => removeSkill(skill, skillType, deleteSlug)}
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

export default SkillComp;
