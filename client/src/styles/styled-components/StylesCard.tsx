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
  rounded_corners,
} = styleVariables;

export const CardContainer = styled.div`
  width: 0em;
  overflow-x: auto;
  white-space: nowrap;
`;

export const Card = styled.div`
  border: ${border_s} solid var(--color-border);
  border-radius: ${rounded_corners};
  box-shadow: ${box_shadows};
  margin: ${spacer_m};
  width: ${(props) => (props.short ? "300px" : props.medium ? "400px" : "100%")};
  height: ${(props) =>
    props.calendarGoals ? "150px" : props.jobCategory ? "500px" : ""};
  display: ${(props) => (props.flex ? "flex" : "block")};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items:space-around;
`;

export const CardContent = styled.div`
  padding: ${spacer_m};
  width: ${(props) => (props.jobCategory ? "300px" : "")};
  display: ${(props) => (props.flex ? "flex" : "block")};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  padding-left: ${(props) => (props.centerPadding ? "40px" : "")};
  padding-top: ${(props) => (props.centerPadding ? "-40px" : "")};

`;

export const JobCard = styled.div`
  border: ${border_s} solid var(--color-border);
  border-radius: ${rounded_corners};
  box-shadow: ${box_shadows};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: ${spacer_s};
`;

export const JobHeader = styled.div`
  display: flex;
  padding: ${spacer_s};
`;

export const CardFooter = styled.div`
  background-color: var(--color-secondary);
  border-top: 1px solid var(--color-border);
`;

export const JobTitle = styled.p`
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
