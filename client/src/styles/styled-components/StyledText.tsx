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
  padding-top: ${spacer_s};
  padding-bottom:0;
  font-size:${props=>props.mediumFont ? font_size_m : font_size_l};
  text-align:${props=> props.centerText ? "center" : ""};
  font-weight: bold;
`;

export const HeaderSecondary = styled.h3`
  padding: ${props=>props.noPadding ? "0" : spacer_m};
  margin-bottom:${props=> props.paddingBottom ? "13px" : "0"};
  padding-left: ${spacer_l};
  font-size:${props=>props.smallFont ? "15px" : font_size_m};
  text-align:${props=> props.centerText ? "center" : ""};
  font-weight: bold;
  color:var(--color-fourth);
`;

export const FooterMain = styled.div`
  background-color: var(--color-third);
  border: 1px solid var(--color-border);
`;