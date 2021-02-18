import styled, { css } from "styled-components";
import DropDown from "../../components/DropDown";
import { styleVariables } from "../design-tokens/style-variables";
import {device} from './breakPoints'

const {
  spacer_s,
  spacer_m,
  spacer_l,
  spacer_xl,
  spacer_xxl,
  font_size_l,
  font_size_m,
  font_size_s,
  box_shadows,
} = styleVariables;

export const NavContainer = styled.div`
  display: flex;
  justify-content: ${props=>props.primary ? "flex-start" : "space-between"};
  position: ${(props) => (props.primary ? "sticky" : "fixed")};
  /* width: "100%"; */
  top: ${(props) => (props.primary ? "0" : "50")};
  background-color: white;
  z-index: ${(props) => (props.primary ? "10" : "9")};
  padding-right:${props=>props.primary ? "" : props.taskNav ? "55%" : "14.5%"};

`;

export const NavLinks = styled.div`
  display: flex;
  flex-direction:${props=>props.expand ? "column" : ""};
  justify-content: ${props=>props.spaceAround ? "space-around" : "flex-start"};
  background-color:${props=>props.backgroundColor ? "var(--color-secondary)" : ""};
  padding-left:${props=>props.prepNav ? "20px" : ""};
  padding-top:${props=>props.primary ? "5px" : ""};
  clear: none; 
  height:${props=> props.expand ? "": 0 };
  @media only screen and (max-width: 700px) {
    display:${props=> props.expand ? "": "none" };
    margin-top:60px;
    margin-left:-100px;
  }
`;

export const NavItem = styled.li`
  

  padding: ${props=> props.prepNav ? "20px 20px": props.primary ? "20px 15px" : "20px 60px"};
  font-size: ${props=> props.primary ? font_size_m : font_size_l};
  margin-right:${props=>props.prepNav ? "15px" : ""};
  color:${props=>props.primary ? "var(--color-third)" : props.jobDetailActive ? "black" : "var(--color-primary)"};
  font-weight:${props=>props.primary ? "800" : ""};
  cursor:pointer;
  padding-top:${props=>props.primary ? "" : "25px"};

  

`;

export const HamburgerBars = styled.img`
width:40px;
height:40px;
margin-top:15px;
display:none;
cursor:pointer;
  @media only screen and (max-width: 700px) {
    display:inline-block
  }
`


