import React from "react";
import { NavLink } from "react-router-dom";
import { NavContainer, NavLinks, NavItem } from "../../styles/NavbarStyles";
import NavStyles from "../../styles/secondaryNav.module.scss";

export default function Preperation(): JSX.Element {
  return (
    <NavContainer>
      <NavLinks>
        <NavLink
          to={{ pathname: "/preperation/interview-questions" }}
          activeClassName={NavStyles.activeNav}
        >
          <NavItem>Interview Questions</NavItem>
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/hard-skills" }}
          activeClassName={NavStyles.activeNav}
        >
          <NavItem>Hard Skills</NavItem>
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/career-goals" }}
          activeClassName={NavStyles.activeNav}
        >
          <NavItem>Career Goals</NavItem>
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/pitch" }}
          activeClassName={NavStyles.activeNav}
        >
          {" "}
          <NavItem>Pitch</NavItem>
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/soft-skills" }}
          activeClassName={NavStyles.activeNav}
        >
          <NavItem>Soft Skills</NavItem>
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/notes" }}
          activeClassName={NavStyles.activeNav}
        >
          <NavItem>Notes</NavItem>
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/resume" }}
          activeClassName={NavStyles.activeNav}
        >
          {" "}
          <NavItem>Resume</NavItem>
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/cover-letter" }}
          activeClassName={NavStyles.activeNav}
        >
          <NavItem>Cover Letters</NavItem>
        </NavLink>
      </NavLinks>
    </NavContainer>
  );
}
