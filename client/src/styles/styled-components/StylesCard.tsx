import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";

const {
  spacer_s,
  spacer_m,
  spacer_xl,
  font_size_l,
  font_size_m,
  box_shadows,
  border_s,
} = styleVariables;

export const CardContainer = styled.div`
width: 0em;
  overflow-x: auto;
    white-space: nowrap;
`

export const Card = styled.div`
border: ${border_s} solid var(--color-border);
box-shadow: ${box_shadows};
margin: ${spacer_m};

width:${(props) => (props.short ? "300px" : "100%")};
height:${(props) => ( props.calendarGoals ? "150px" : props.jobCategory ? "500px" : "100%")};
display:${(props) => (props.progress ? "flex" : "block")};

`;

export const CardContent = styled.div`
padding:${spacer_m};
`

export const JobCard = styled.div`
border: ${border_s} solid var(--color-border);
margin: ${spacer_m};
padding: ${spacer_m};
display:flex;
justify-content:space-evenly;
`

export const JobHeader = styled.div`

`