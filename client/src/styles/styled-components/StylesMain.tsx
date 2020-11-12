import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";
import AddButtonImg from "../../assets/add-button.png";

const {
  spacer_xs,
  spacer_s,
  spacer_m,
  spacer_l,
  spacer_xl,
  font_size_l,
  font_size_m,
  box_shadows,
} = styleVariables;

export const PageContainer = styled.div`
  margin: ${spacer_xl};
  display: ${props=> props.menu ? "flex" : ""} ;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  flex-wrap: ${(props) => (props.wrap ? "wrap" : "nowrap")};

  justify-content: ${(props) => (props.even ? "space-evenly" : props.center ? "center" :"flex-start" )};
  text-align:${props=>props.textCenter ? "center":""};
`;

export const HeaderMain = styled.h5`
  padding: ${spacer_l};
`;

export const JobColumnsStyled = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;

  
`;

export const Form = styled.form`


`

export const Input = styled.input`
width:50%;
`


export const Button = styled.button`

`


export const AddButton = styled.img`
width:30px;
height:30px;
border:3px solid var(--color-border);
border-radius:50%;
padding:${spacer_xs};
margin-bottom:20px;
margin-left:-45px;
/* position:fixed;
right:120px;
top:650px; */
`
