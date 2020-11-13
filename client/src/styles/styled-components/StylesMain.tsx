import styled, { css } from "styled-components";
import { styleVariables } from "../design-tokens/style-variables";
import AddButtonImg from "../../assets/add-button.png";

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

export const StyledForm = styled.form`
  display:flex;
  flex-direction:column;
  align-items:space-between;
  div{
    padding:10px;
  }
  & .date-time{
   padding-top:${spacer_l};
   cursor:pointer;

  }
  & .date-time:hover {
    background-color:var(--color-background);
  }
  & .date-time input {
   font-family: 'Montserrat', sans-serif;
   margin-right:${spacer_s};
   font-size:${font_size_m};
   border:none;
   background:none;
   
 }
 & .date-time input::-webkit-calendar-picker-indicator {
    background: none;
}
 & .date-time input:hover{
   border-bottom:1px solid var(--color-primary);
   cursor:pointer;

`

export const StyledInput = styled.input`
 /* background-color: transparent; */
    font-size:${font_size_l};
    border:0 !important; 
       border-bottom:2px solid var(--color-third) !important; 
    &:focus {
        outline: none;
        color:purple;
        border-bottom:1px solid var(--color-primary) !important; 


    }
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
