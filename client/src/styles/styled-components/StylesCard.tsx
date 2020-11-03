import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";

const {
  spacer_s,
  spacer_m,
  spacer_xl,
  spacer_xxl,
  font_size_l,
  font_size_m,
  box_shadows,
  border_s,
  border_xl,
} = styleVariables;

export const CardContainer = styled.div`
  width: 0em;
  overflow-x: auto;
  white-space: nowrap;
`;

export const Card = styled.div`
  border: ${border_s} solid var(--color-border);
  box-shadow: ${box_shadows};
  margin: ${spacer_m};

  width: ${(props) => (props.short ? "300px" : "100%")};
  height: ${(props) =>
    props.calendarGoals ? "150px" : props.jobCategory ? "500px" : "100%"};
  display: ${(props) => (props.progress ? "flex" : "block")};
`;

export const CardContent = styled.div`
  padding: ${spacer_m};
  width: ${(props) => (props.jobCategory ? "300px" : "")};
`;

export const JobCard = styled.div`
  border: ${border_s} solid var(--color-border);
  margin: ${spacer_m};
  padding: ${spacer_s};
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  width: 75%;
`;

export const JobHeader = styled.div`
display:flex;
  
`;

export const JobFooter = styled.div`

`

export const JobTitle = styled.p `
white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
`
