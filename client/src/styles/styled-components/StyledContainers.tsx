import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";

const {
  spacer_xs,
  spacer_s,
  spacer_m,
  spacer_l,
  spacer_xl,
  spacer_xxl,
  font_size_l,
  font_size_m,
  font_size_s,
  box_shadows,
  border_s,
  border_xl,
  rounded_corners_m,
  rounded_corners_l,
  small_circle,
} = styleVariables;

export const PageContainer = styled.div`
  margin: ${spacer_xl};
  margin-top: ${(props) => (props.withSecondNav ? "150px" : "20px")};
  position: ${(props) => (props.withSecondNav ? "relative" : "")};
  z-index: ${(props) => (props.withSecondNav ? "8" : "10px")};

  display: ${(props) => (props.flex ? "flex" : "")};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};
  justify-content: ${(props) =>
    props.even ? "space-evenly" : props.center ? "center" : "flex-start"};
  text-align: ${(props) => (props.textCenter ? "center" : "")};
`;

export const CardContainer = styled.div`
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

  display: ${(props) => (props.flex ? "flex" : "block")};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items: space-around;
  border: ${(props) =>
    props.noBorder ? "none" : `${border_s} solid var(--color-border)`};
  box-shadow: ${box_shadows};
  /* 
  border-radius: ${(props) =>
    props.inner ? rounded_corners_m : rounded_corners_l};
  margin: ${(props) => (props.inner ? spacer_xl : spacer_m)};
   */
`;

export const Card = styled.div`
  display: ${(props) => (props.flex ? "flex" : "block")};
  justify-content:${props=>props.spaceBetween ? "space-between" : ""};
  margin: ${spacer_m};
  padding: ${spacer_m};
  border: ${(props) =>
    props.noBorder ? "none" : `${border_s} solid var(--color-border)`};
`;
