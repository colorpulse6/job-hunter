import styled, { css } from "styled-components";
import DropDown from "../../components/DropDown";
import { styleVariables } from "../design-tokens/style-variables";

const {
  spacer_s,
  spacer_m,
  spacer_xl,
  font_size_l,
  font_size_m,
  box_shadows,
} = styleVariables;

export const NavContainer = styled.div`
  background-color: ${(props) =>
  props.primary ? "var(--color-mellow)" : props.jobDetailPage ? "var(--color-third)" : "var(--color-bright)"};
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  border-bottom: ${props=>props.jobDetailPage ? "" : "5px solid var(--color-bright)"};
  
`;

export const NavLinks = styled.div`
  display: flex;
  border-top: ${(props) =>
    props.primary ? "10px solid var(--color-mellow) !important" : props.jobDetailPage ? "var(--color-third) !important" : null};
  ${(props) =>
    props.primary &&
    css`
      li:hover {
        background-color: var(--color-primary);
        border-top-right-radius: 25px;
        border-top-left-radius: 25px;
        border: 0;
        color:var(--color-mellow)
      }
    `}

`;

export const NavItem = styled.li`
  padding: ${(props) => (props.primary ? spacer_m : spacer_s)};
  margin: ${(props) =>
    props.primary ? `${spacer_m} ${spacer_s}` : `${spacer_m} ${spacer_m}`};
  font-size: ${(props) => (props.primary ? "" : font_size_m)};
  color:${props=> props.jobDetailActive ? "var(--color-primary)":"black"};
  background-color: ${props=> props.jobDetailActive ? "var(--color-bright)":""};
  cursor:${props=>props.jobDetailPage ? "pointer" : ""};
  border-bottom: ${props=>props.jobDetailActive ? "5px solid var(--color-bright) !important" : ""};
  
    border-top-right-radius: ${props=>props.jobDetailPage ? "25px!important " : ""} ;
    border-top-left-radius: ${props=>props.jobDetailPage ? "25px!important" : ""};
    margin-bottom:0;
`;

export const ProfilePic = styled.li`
  display: inline-block;
  margin: ${spacer_m} ${spacer_xl};
  border: 1px solid var(--color-border);
  padding: ${spacer_m};
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  color: var(--color-primary);
  position: relative;
`;

export const StyledDropDown = styled(DropDown)`
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: ${box_shadows};
  padding: ${spacer_s} ${spacer_m};
  right: 20px;
  top: 80px;
  display: flex;
  flex-direction: column;
  font-size: ${font_size_m};
`;

export const Logo = styled.img`
width: ${props=> props.landing ? "100px" : "45px"};
height: ${props=> props.landing ? "100px" : "45px"};
padding:5px 20px;
pointer-events:none;
margin:${props=> props.landing ? "0 auto" : ""}
`
