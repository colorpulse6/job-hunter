import styled, { css } from "styled-components";
import DropDown from "../../components/DropDown";
import { styleVariables } from "../design-tokens/style-variables";

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
  justify-content: space-between;
  position: ${(props) => (props.primary ? "sticky" : "fixed")};
  width: "100%";
  top: ${(props) => (props.primary ? "0" : "50")};
  background-color: white;
  z-index: ${(props) => (props.primary ? "10" : "9")};
`;

export const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  padding-left:${props=>props.prepNav ? "20px" : ""};
  padding-top:${props=>props.primary ? "5px" : ""};
 
  
`;

export const NavItem = styled.li`
  padding: ${props=> props.prepNav ? "20px 20px": "20px 60px"};
  font-size: ${font_size_l};
  margin-bottom: 30px;
  margin-right:${props=>props.prepNav ? "15px" : ""};
  color:var(--color-primary);
`;

export const Logo = styled.img`
  width: ${(props) => (props.landing ? "100px" : "55px")};
  height: ${(props) => (props.landing ? "100px" : "55px")};
  padding: 15px 20px;
  pointer-events: none;
  margin: ${(props) => (props.landing ? "0 auto" : "")};
  margin-left: ${(props) => (props.landing ? "" : "5px")};
`;

export const ProfilePic = styled.li`
  margin: ${spacer_l} ${spacer_xxl};
  border: 1px solid var(--color-border);
  padding: ${spacer_m};
  border-radius: 50%;
  cursor: pointer;
  color: var(--color-primary);
`;

export const StyledDropDown = styled(DropDown)`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 20px;
  top: 80px;
  background-color: #f9f9f9;
  box-shadow: ${box_shadows};
  padding: ${spacer_s} ${spacer_m};
  font-size: ${font_size_m};
`;
