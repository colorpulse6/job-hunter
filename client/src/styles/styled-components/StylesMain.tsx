import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";

const {
    spacer_s,
    spacer_m,
    spacer_l,
    spacer_xl,
    font_size_l,
    font_size_m,
    box_shadows,
  } = styleVariables;

  

export const PageContainer = styled.div`
margin: ${spacer_xl};
display:flex;
flex-direction:${(props)=>props.column ? "column" : "row"};
flex-wrap:${(props) => ( props.jobPage ? "wrap" : "nowrap")};

justify-content:${(props) => ( props.even ? "space-evenly" : "flex-start")};




`

export const HeaderMain = styled.h5`
padding:${spacer_l}
`

export const JobColumns = styled.div`
display:flex;
  overflow-x: auto;
    white-space: nowrap;

`



