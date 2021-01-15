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
    <>
      <Flex column fixed >
        <HeaderMain style={{ textAlign: "center" }}>{title}</HeaderMain>

        <Card
          noBorder
          medium
          constrainMedium
          center
          roundedCorners
          shadow
          taller
          
        >
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
          <div style={{ marginTop: "12px"}}>
            {skillList.length > 0 && showSkills
              ? skillList.map((skillItem, index) => {
                  return (
                    <CardContainer flex wrap noBorder center noShadow noBackground
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
                    </CardContainer>
                  );
                })
              : null}
          </div>
          <Flex 
          wrap
          
          flex-start
           style={{ marginTop: "30px", height:"75%"}}>
            {skillState
              ? skillState.map((skill, index) => {
                  return (
                    <StyledButton shrink small active noHoverColor style={{  display:"flex", justifyContent:"space-between", marginBottom:"10px"}} key={index}>
                      <p style={{marginTop:"9px", color:"black"}}>{skill}</p>

                      <StyledButton
                        noBorder
                        noPadding
                        active
                        noHoverColor
                        style={{marginTop:"5px", cursor:"none"}}
                        onClick={() =>
                          removeSkill(skill, skillType, deleteSlug)
                        }
                      >
                        <StyledIcon small src={Trash} />
                      </StyledButton>
                    </StyledButton>
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
