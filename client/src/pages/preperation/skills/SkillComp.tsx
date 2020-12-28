import React from "react";
import Form from "../../../components/Form";
import {
  PageContainer,
  CardContainer,
  Card,
  CardContent,
  Flex,
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

  const onChange = (e) => {
    setInput(e);
    setShowSkills(true);
  };

  return (
    <>
      <Card medium overflow constrainMedium center>
        <HeaderMain>{title}</HeaderMain>
        <Form
          noSubmit
          onChange={onChange}
          inputs={[
            {
              label: "Search Skills",

              type: "text",
              id: "skills",
              name: "skills",
              required: true,
            },
          ]}
        />

        {skillList.length > 0 && showSkills
          ? skillList.map((skillItem, index) => {
              return (
                <Card colored shrink>
                  <p
                    key={index}
                    onClick={(e) => {
                      addSkill(e, skillItem, skillType, slug);
                      setShowSkills(false);
                    }}
                  >
                    {skillItem}
                  </p>
                </Card>
              );
            })
          : null}
        <Flex column>
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
        </Flex>
      </Card>
    </>
  );
};

export default SkillComp;
