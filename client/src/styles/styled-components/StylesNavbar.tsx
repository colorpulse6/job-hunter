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
  justify-content: ${props=>props.spaceAround ? "space-around" : "flex-start"};
  background-color:${props=>props.backgroundColor ? "var(--color-secondary)" : ""};
  padding-left:${props=>props.prepNav ? "20px" : ""};
  padding-top:${props=>props.primary ? "5px" : ""};
  clear: none; 
  height: 0;
 
`;

export const NavItem = styled.li`
  @media ${device.tabletM} { 
    font-size:10px;
    color:green;
  }
  @media ${device.tabletS} { 
    font-size:8px;
    color:green;
  }
  @media ${device.mobileL} { 
    font-size:7px; 
     }

  @media ${device.mobileS} { 
    color:black;
  }




  padding: ${props=> props.prepNav ? "20px 20px": props.primary ? "20px 15px" : "20px 60px"};
  font-size: ${props=> props.primary ? font_size_m : font_size_l};
  margin-right:${props=>props.prepNav ? "15px" : ""};
  color:${props=>props.primary ? "var(--color-third)" : props.jobDetailActive ? "black" : "var(--color-primary)"};
  font-weight:${props=>props.primary ? "800" : ""};
  cursor:pointer;
  padding-top:${props=>props.primary ? "" : "25px"};

  

`;


