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
import Trash from "../../../assets/trash-icon.png";
import {
  StyledButton,
  StyledIcon,
} from "../../../styles/styled-components/StyledElements";

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
    <><Flex column>
            <HeaderMain style={{textAlign:"center"}}>{title}</HeaderMain>

      <Card noBorder medium overflow constrainMedium center roundedCorners shadow>
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
        <div style={{ marginTop: "12px" }}>
          {skillList.length > 0 && showSkills
            ? skillList.map((skillItem, index) => {
                return (
                  <Card
                    shrinker
                    noBorder
                    
                    
                    smallFont
                    secondBg
                    skills
                    style={{ cursor: "pointer" }}
                  >
                    <p
                      key={index}
                      onClick={(e) => {
                        addSkill(e, skillItem, skillType, slug);
                        setShowSkills(false);
                      }}
                      style={{ marginTop: "-5px" }}
                    >
                      {skillItem}
                    </p>
                  </Card>
                );
              })
            : null}
        </div>
        <Flex column style={{ marginTop: "30px" }}>
          {skillState
            ? skillState.map((skill, index) => {
                return (
                  <Flex key={index}>
                    <p>{skill}</p>

                    <StyledButton
                      noDisplay
                      onClick={() => removeSkill(skill, skillType, deleteSlug)}
                    >
                      <StyledIcon small src={Trash} />
                    </StyledButton>
                  </Flex>
                );
              })
            : null}
        </Flex>
      </Card>
      </Flex>
    </>
  );
};

export default SkillComp;
