import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";

import Check from "../../assets/draw-check-mark.png";
const {
  spacer_xs,
  spacer_s,
  spacer_m,
  spacer_l,
  spacer_xl,
  spacer_xxl,
  font_size_l,
  font_size_m,
  box_shadows,
  border_s,
  border_xl,
  rounded_corners_m,
  rounded_corners_l,
} = styleVariables;

export const CardContainer = styled.div`
  width: 0em;
  overflow-x: auto;
  white-space: nowrap;
`;

export const Card = styled.div`
  border: ${props=>props.noBorder ? "none" : `${border_s} solid var(--color-border)`};
  border-radius: ${(props) =>
    props.inner ? rounded_corners_m : rounded_corners_l};
  box-shadow: ${box_shadows};
  margin: ${(props) => (props.inner ? spacer_xl : spacer_m)};
  /* margin-left:${(props) => (props.inner ? "-0px" : "")}; */

  width: ${(props) =>
    props.short
      ? "300px"
      : props.medium
      ? "400px"
      : props.large
      ? "800px"
      : props.inner
      ? "90%"
      : "100%"};
  height: ${(props) =>
    props.calendarGoals ? "150px" : props.jobCategory ? "500px" : ""};
  display: ${(props) => (props.flex ? "flex" : "block")};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items: space-around;
`;

export const CardContent = styled.div`
  padding: ${(props) => (props.todo ? "0" : spacer_m)};
  width: ${(props) => (props.jobCategory ? "300px" : "")};
  display: ${(props) => (props.flex ? "flex" : "block")};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  justify-content: ${props=>props.around ? "space-around" : "space-between"};

  padding-left: ${(props) => (props.centerPadding ? "40px" : "")};
  padding-top: ${(props) => (props.centerPadding ? "-40px" : "")};
  text-align: ${(props) => (props.textCenter ? "center" : "")};
  ${(props) =>
    props.todo &&
    css`
      p {
        padding-top: ${spacer_xl};
        /* padding-left:${spacer_xs}; */
      }
    `}
    margin: ${props => props.center ? "0 auto" : ""};
`;

export const CardItem = styled.div`

`

export const Circle = styled.input`
  width: 1.3em;
  height: 1.3em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid var(--color-secondary);
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  margin-left: 20px;
  margin-right: -350px;
  margin-top: 30px;
  margin-bottom: 20px;
  ${(props) =>
    props.checked &&
    css`
      :checked {
        background-color: var(--color-secondary);
        border: 1px solid white;

        background-image: ${Check};
      }
    `}
`;

export const StyledCheck = styled.img`
  width: 1.1em;
  height: 1.1em;
  color: white;
  border-radius: 50%;
  vertical-align: middle;
  outline: none;
  cursor: pointer;
  background-color: var(--color-third);
  border: 1px solid white;
  border-radius: 50%;

  margin-left: 20px;
  margin-right: -350px;
  margin-top: 30px;
  margin-bottom: 20px;
`;

export const JobCard = styled.div`
  border: ${border_s} solid var(--color-border);
  border-radius: ${rounded_corners_l};
  box-shadow: ${box_shadows};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: ${spacer_s};
  background-color: white;
  transform: ${(props) => (props.isDragging ? "rotate(20deg)" : "")};
`;

export const JobHeader = styled.div`
  display: flex;
  padding: ${spacer_s};
`;

export const CardFooter = styled.div`
  background-color: var(--color-third);
  border-top: 1px solid var(--color-border);
`;

export const JobTitle = styled.p`
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DropContainer = styled.div`
  padding: ${spacer_m};
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "blue" : "white")};
  flex-grow: 1;
  overflow-y: auto;
  height: 400px;
`;
