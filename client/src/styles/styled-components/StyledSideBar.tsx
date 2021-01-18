import { isPropsEqual } from "@fullcalendar/react";
import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";

//Buttons

const {
  spacer_xs,
  spacer_s,
  spacer_m,
  spacer_l,
  spacer_xl,
  font_size_xs,
  font_size_s,
  font_size_m,
  font_size_l,
  box_shadows,
  rounded_corners_m,
  rounded_corners_l,
  small_button,
  small_circle,
} = styleVariables;

export const StyledSideBar = styled.div`
  background-color:var(--color-third);
  position: fixed;
  left: 0;
  margin-top: -150px;
  min-height: 100vh;

`;


