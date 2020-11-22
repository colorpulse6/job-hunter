import React from 'react'
import HardSkills from "./HardSkills"
import SoftSkills from "./SoftSkills"
import PrepNav from "../PrepNav";

import {
    PageContainer,
    CardContainer,
    Card,
  } from "../../../styles/styled-components/StyledContainers";

const Skills = () => {
    return (
        <>
      <PrepNav />
      <PageContainer flex withSecondNav>

          <HardSkills />
          <SoftSkills />
          </PageContainer>




            
        </>
    )
}

export default Skills
