import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";

const {
    spacer_xs,
    spacer_s,
    spacer_m,
    spacer_l,
    spacer_xl,
    font_size_s,
    font_size_m,
    font_size_l,
    box_shadows,
    rounded_corners_m,
    rounded_corners_l,
    small_button,
    small_circle
  } = styleVariables;


export const HeaderMain = styled.h1`
  padding: ${spacer_l};
  padding-bottom:0;
  font-size:${props=>props.mediumFont ? font_size_m : font_size_l};
  text-align:${props=> props.centerText ? "center" : ""};
  font-weight: bold;
`;

export const HeaderSecondary = styled.h3`
  padding: ${spacer_m};
  padding-bottom:0;
  font-size:${props=>props.smallFont ? font_size_s : font_size_m};
  text-align:${props=> props.centerText ? "center" : ""};
  font-weight: bold;
  text-decoration: underline;
`;

export const FooterMain = styled.div`
  background-color: var(--color-third);
  border: 1px solid var(--color-border);
`;