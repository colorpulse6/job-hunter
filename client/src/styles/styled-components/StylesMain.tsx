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
  rounded_corners_m,
  rounded_corners_l
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
    /* padding:10px; */
  }
  & .date-time{
    display:flex;
    justify-content:left;
   padding-top:${spacer_l};
   margin-left:-20px;


  }
  & .date-time div input:hover {
    background-color:var(--color-background);
    border-radius:${rounded_corners_m}
  }
  & .date-time * {
   font-family: 'Montserrat', sans-serif;
   font-size:${font_size_m};
   border:none;
   padding:none important!;
   text-align:center;

 }
 

 & .input-container input {
    border: none;
    box-sizing: border-box;
    outline: 0;
    position: relative;
    width: 100%;
}

& input::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
}


& .date-time div input::-webkit-datetime-edit{
padding:5px -10px;
margin: 5px
}




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


export const StyledSubmit = styled.input`

    background-color:var(--color-third) !important;
    &:hover{
      box-shadow: ${box_shadows};
   
    }
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
