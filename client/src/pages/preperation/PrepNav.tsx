import React from "react";
import { NavLink } from "react-router-dom";
import {
  NavContainer,
  NavLinks,
  NavItem,
} from "../../styles/styled-components/StylesNavbar";
import NavStyles from "../../styles/secondaryNav.module.scss";

export default function Preperation(): JSX.Element {
  return (
    <>
      <NavContainer>
        <NavLinks prepNav>
          <NavLink
            to={{ pathname: "/preperation/interview-questions" }}
            activeClassName={NavStyles.activeNav}
          >
            <NavItem prepNav>Interview Questions</NavItem>
          </NavLink>

          <NavLink
            to={{ pathname: "/preperation/skills" }}
            activeClassName={NavStyles.activeNav}
          >
            <NavItem prepNav>Skills</NavItem>
          </NavLink>

          <NavLink
            to={{ pathname: "/preperation/career-goals" }}
            activeClassName={NavStyles.activeNav}
          >
            <NavItem prepNav>Career Goals</NavItem>
          </NavLink>

          <NavLink
            to={{ pathname: "/preperation/pitch" }}
            activeClassName={NavStyles.activeNav}
          >
            {" "}
            <NavItem prepNav>Pitch</NavItem>
          </NavLink>

          <NavLink
            to={{ pathname: "/preperation/notes" }}
            activeClassName={NavStyles.activeNav}
          >
            <NavItem prepNav>Notes</NavItem>
          </NavLink>

          <NavLink
            to={{ pathname: "/preperation/resume" }}
            activeClassName={NavStyles.activeNav}
          >
            {" "}
            <NavItem prepNav>Resume</NavItem>
          </NavLink>

          <NavLink
            to={{ pathname: "/preperation/cover-letter" }}
            activeClassName={NavStyles.activeNav}
          >
            <NavItem prepNav>Cover Letters</NavItem>
          </NavLink>
        </NavLinks>
      </NavContainer>
    </>
  );
}
