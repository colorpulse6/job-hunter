import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";


//Buttons

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

export const StyledButton = styled.button`
background-color:${props=> props.active ? 'var(--color-bright)': props.noDisplay ? "": 'var(--color-third)'};
border:${props=>props.noDisplay ? "none" : ""};
padding:${props=>props.noDisplay ? "0": ""};
font-size:${font_size_s};
width:${props=>props.fullWidth ? "100%" : ""};

    &:hover{
      box-shadow: ${props=>props.noDisplay ? "" : box_shadows};
    }
`

export const StyledIcon = styled.img `
width:${props=>props.small ? "20px" : ""}
`