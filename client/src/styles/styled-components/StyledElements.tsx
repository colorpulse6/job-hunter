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

export const StyledIcon = styled.img`
  width: ${(props) => (props.small ? "20px" : props.tiny ? "10px" : "")};
  padding-right: ${(props) => (props.paddingRight ? spacer_m : "")};
  position: relative;
`;

export const StyledSelect = styled.select`
  border: none;
  padding-right: 2px;
  margin: ${spacer_s};
  outline: 0;
  font-size: ${font_size_m};
`;

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
  border-color: var(--color-border);
  border-radius: ${rounded_corners_m};

  padding: ${(props) =>
    props.noDisplay ? "0" : props.small ? "0 10px" : "10px"};
  width: ${(props) => (props.fullWidth ? "100%" : "")};
  height: ${(props) => (props.small ? "30px" : "")};

  p {
    margin-top: ${(props) => (props.small ? "6px" : "")};
  }

  &:hover {
    box-shadow: ${(props) => (props.noDisplay ? "" : box_shadows)};
    background-color: ${(props) =>
      props.offColor
        ? "var(--color-third)"
        : props.noDisplay
        ? ""
        : "var(--color-fourth)"};
    color: ${(props) =>
      props.offColor
        ? "var(--color-primary)"
        : props.noDisplay
        ? "var(--color-fourth)"
        : "var(--color-bright)"};
  }
  margin-right: ${(props) => (props.todo ? "50px" : "")};
  margin-top: ${(props) => (props.todo ? "-3px" : "")};
  cursor: pointer;

  /* font-size: 15px; */
`;

export const AuthButton = styled.button`
  margin: 50px 150px 50px 150px;
  z-index: 2;
  border: none;
  background: none;
  font-size: 30px;
  color: ${(props) =>
    props.active ? "var(--color-secondary)" : "var(--color-primary)"};
  transform: ${(props) => (props.active ? "scale(1.06)" : "")};
  outline: 0;

  cursor: pointer;
  transition: all 0.3s ease-in-out;

  :after {
    background: none repeat scroll 0 0 transparent;
    content: "";
    display: block;
    height: 2px;
    background: var(--color-primary);
    transition: all 0.2s ease-in-out;
    width: ${(props) => (props.active ? "100%" : "0")};
  }
  :hover:after {
    width: 100%;
  }
  :hover {
    transform: scale(1.06);
    color: var(--color-secondary);
    
  }


`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  background-color: var(--color-primary);
  /* height: 350px; */
  width: 550px;
  
  border-radius: ${rounded_corners_l};
  margin: 0 auto;
  div {
    margin: ${(props) => (props.auth ? "10px" : "")};
    z-index: 3;
    margin:0 auto;
    margin-top:10px;
  }
  & .auth-submit{
    position:relative;
    top:40px;
  }
  
  
`;

export const StyledInput = styled.input`
  background-color: transparent;
  padding:20px;
  ::placeholder {
    padding:0;
  color: var(--color-bright);
  
}
width:100%;
  font-size: ${(props) =>
    props.fontMedium
      ? font_size_m
      : props.fontSmall
      ? font_size_s
      : font_size_l};
  border: 0 !important;
  border-bottom: 2px solid var(--color-third) !important;
  &:focus {
    outline: none;
    border-bottom: 2px solid var(--color-third) !important;
  }
`;

export const StyledSubmit = styled.input`
  background-color: var(--color-secondary);
 
  &:hover {
    box-shadow: ${box_shadows};
  }
  border-radius: ${rounded_corners_m};
  padding: ${spacer_m};
  border: 1px solid var(--color-border);
  font-size: ${font_size_m};
  cursor: pointer;
  
`;
