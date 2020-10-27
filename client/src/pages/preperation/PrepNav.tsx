import React from "react";
import { NavLink } from "react-router-dom";
import NavStyles from "../../components/secondaryNav.module.scss";

export default function Preperation(): JSX.Element {
  return (
    <div className={NavStyles.navContainer}>
      <div className={NavStyles.navLinks}>
        <NavLink
          to={{ pathname: "/preperation/interview-questions" }}
          activeClassName={NavStyles.activeNav}
        >
         <li>Interview Questions</li> 
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/hard-skills" }}
          activeClassName={NavStyles.activeNav}
        >
         <li>Hard Skills</li> 
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/career-goals" }}
          activeClassName={NavStyles.activeNav}
        >
         <li>Career Goals</li> 
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/pitch" }}
          activeClassName={NavStyles.activeNav}
        >
          {" "}
          <li>Pitch</li> 
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/soft-skills" }}
          activeClassName={NavStyles.activeNav}
        >
         <li>Soft Skills</li> 
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/notes" }}
          activeClassName={NavStyles.activeNav}
        >
         <li>Notes</li> 
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/resume" }}
          activeClassName={NavStyles.activeNav}
        >
          {" "}
          <li>Resume</li> 
        </NavLink>

        <NavLink
          to={{ pathname: "/preperation/cover-letter" }}
          activeClassName={NavStyles.activeNav}
        >
         <li>Cover Letters</li> 
        </NavLink>
      </div>
    </div>
  );
}
