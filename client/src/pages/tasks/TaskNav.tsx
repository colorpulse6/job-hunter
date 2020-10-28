import React from "react";
import { NavLink } from "react-router-dom";
import { NavContainer, NavLinks, NavItem } from "../../styles/NavbarStyles"

import NavStyles from "../../styles/secondaryNav.module.scss";
export default function Tasks(): JSX.Element {
  // console.log(taskState.todos)
  return (
    <NavContainer>
      <NavLinks>
        
        <NavLink
          to={{ pathname: "/tasks/todos" }}
          
          activeClassName={NavStyles.activeNav}
        >
          <NavItem>Todos</NavItem> 
        </NavLink>
        <NavLink to="/tasks/challenges" activeClassName={NavStyles.activeNav}>
        <NavItem> Challenges</NavItem> 
        </NavLink>
        <NavLink to="/tasks/learning" activeClassName={NavStyles.activeNav}>
        <NavItem>Learning</NavItem> 
        </NavLink>
      </NavLinks>
    </NavContainer>
  );
}
