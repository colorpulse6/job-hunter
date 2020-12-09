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
  background-color: var(--color-secondary);
  /* height: 350px; */
  width: 550px;

  border-radius: ${rounded_corners_l};
  margin: 0 auto;
  div {
    margin: ${(props) => (props.auth ? "10px" : "")};
    z-index: 3;
    margin: 0 auto;
    margin-top: 10px;
  }
  & .auth-submit {
    position: relative;
    top: 40px;
  }
  overflow: auto;

`;

export const FloatingLabelContainer = styled.div`
  position: relative;
  margin: 40px 0 20px;
  margin-bottom:-15px;

  input {
    font-size: 15px;
    padding: ${props=>props.smallText ? "5px 5px 10px 5px" : "25px 25px 10px 5px"};
    display: block;
    width: 380px;
    border: none;
    border-bottom: 1px solid var(--color-bright);
    background: none;
  }

  input:focus {
    outline: none;
  }

  label {
    color: ${props=>props.hasBackground ? "var(--color-mellow)":"var(--color-primary)"};
    font-size: ${props=>props.smallText ? "14px" : "18px"} ;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  input:focus ~ label,
  input:valid ~ label {
    top: -5px;
    font-size: ${props=>props.smallText ? "12px" : "14px"} ;
    color: ${props=>props.hasBackground ? "var(--color-mellow)":"var(--color-primary)"};
    margin-top: ${props=>props.smallText ? "-10px" : "8px"} ;
  }

  .bar {
    position: relative;
    display: block;
    width: 315px;
  }

  .bar:before,
  .bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #4285f4;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .bar:before {
    left: 50%;
  }

  .bar:after {
    right: 50%;
  }

  input:focus ~ .bar:before,
  input:focus ~ .bar:after {
    width: 50%;
  }

  .highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  input:focus ~ .highlight {
    -webkit-animation: inputHighlighter 0.3s ease;
    -moz-animation: inputHighlighter 0.3s ease;
    animation: inputHighlighter 0.3s ease;
  }

  /* animations */
  @-webkit-keyframes inputHighlighter {
    from {
      background: #4285f4;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
  @-moz-keyframes inputHighlighter {
    from {
      background: #4285f4;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
  @keyframes inputHighlighter {
    from {
      background: #4285f4;
    }
    to {
      width: 0;
      background: transparent;
    }
  }
`;




export const StyledInput = styled.input`
  background-color: transparent;
  padding: 20px;
  ::placeholder {
    padding: 0;
    color: var(--color-bright);
  }
  width: 100%;
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
  background-color: var(--color-primary);
  color: var(--color-bright);
  margin: 30px;
  padding: ${spacer_m};
  &:hover {
    box-shadow: ${box_shadows};
  }
  border-radius: ${rounded_corners_m};
  border: 1px solid var(--color-border);
  font-size: ${font_size_m};
  cursor: pointer;
`;

export const CalendarViewSelect = styled.input`
  /* outline:1px solid ${(props) =>
    props.deadlines
      ? "#4D7C8A"
      : props.otherEvents
      ? "#c0d6df"
      : props.jobsApplied
      ? "#1B4079"
      : props.jobsAdded
      ? "#CBDF90"
      : ""};
    outline-offset: -2px; */

  width: 14px !important;
  height: 14px !important;
  margin: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  outline: 1px solid gray;
  box-shadow: none;
  font-size: 0.9em;

  /* text-align: center; */
  /* line-height: 1em; */
  background: ${(props) =>
    props.deadlines
      ? "#4D7C8A"
      : props.otherEvents
      ? "#c0d6df"
      : props.jobsApplied
      ? "#1B4079"
      : props.jobsAdded
      ? "#CBDF90"
      : ""};

  :checked:after {
    content: "✔";
    /* color: white; */
  }
`;

export const StyledTextField = styled.textarea`

width:100%;
height:170px;
border-radius:${rounded_corners_l};
padding:5px;
font-family: 'Montserrat', sans-serif;

`


