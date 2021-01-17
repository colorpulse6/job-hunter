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
  small_circle,
} = styleVariables;

export const HeaderMain = styled.h1`
  padding-top: ${spacer_s};
  padding-bottom: 0;
  font-size: ${(props) => (props.mediumFont ? font_size_m : font_size_l)};
  text-align: ${(props) => (props.centerText ? "center" : "")};
  font-weight: bold;
`;

export const HeaderSecondary = styled.h3`
  padding: ${(props) => (props.noPadding ? "0" : spacer_m)};
  margin-bottom: ${(props) => (props.marginBottom ? "13px" : "0")};
  font-size: ${(props) => (props.smallFont ? "15px" : props.largeFont ? font_size_l : font_size_m)};
  text-align: ${(props) => (props.centerText ? "center" : "")};
  font-weight: bold;
  color: var(--color-fourth);
`;

export const FooterMain = styled.div`
  background-color: var(--color-third);
  border: 1px solid var(--color-border);
`;

export const HugeTitle = styled.h1`
  font-size: 150px;
  position: absolute;
  left: 16%;
  top: 28%;
  opacity: 15%;
  z-index: 1;
`;

export const TinyText = styled.p`
  font-size: 10px;
  padding-top: ${(props) => (props.job ? "15px" : "")};
  padding-left: ${(props) => (props.job ? "145px" :  "")};
  margin: 0;
  margin-top: ${(props) => (props.addedDate ? "5px" : "")};
`;

export const LimitLinkText = styled.a`
  width: 80%;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const ActiveText = styled.span`

`
