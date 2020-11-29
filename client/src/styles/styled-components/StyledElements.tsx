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

export const StyledButton = styled.button`
  background-color: ${(props) =>
    props.active
      ? "var(--color-bright)"
      : props.noDisplay
      ? "white"
      : props.offColor
      ? "var(--color-fourth)"
      : "var(--color-third)"};
  color: ${(props) =>
    props.offColor ? "var(--color-bright)" : "var(--color-primary)"};
  border: ${(props) => (props.noDisplay ? "none" : "1px solid black")};
  border-color:var(--color-border);
  border-radius:${rounded_corners_m};
   
  padding: ${(props) =>
    props.noDisplay ? "0" : props.small ? "0 10px" : "10px"};
  width: ${(props) => (props.fullWidth ? "100%" : "")};
  height:${(props) => (props.small ? "30px" : "")};

  p{
    margin-top:${props=>props.small ? "6px" : ""};
  }
  &:hover {
    box-shadow: ${(props) => (props.noDisplay ? "" : box_shadows)};
    background-color:${props=>props.offColor ? "var(--color-third)" : "var(--color-fourth)"};
   color:${props=>props.offColor ? "var(--color-primary)" : "var(--color-bright)"}
  }
  margin-right: ${(props) => (props.todo ? "50px" : "")};
  margin-top: ${(props) => (props.todo ? "-3px" : "")};
  cursor: pointer;
  
  /* font-size: 15px; */
`;

export const StyledIcon = styled.img`
  width: ${(props) => (props.small ? "20px" : props.tiny ? "10px" : "")};
  padding-right: ${(props) => (props.paddingRight ? spacer_m : "")};
  position: relative;
`;
