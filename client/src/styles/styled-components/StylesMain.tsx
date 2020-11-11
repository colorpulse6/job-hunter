import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";

const {
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
