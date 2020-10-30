import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { AuthContext } from "../context/AuthContext";

import { NavContainer, NavLinks, NavItem, ProfilePic, StyledDropDown } from "../styles/styled-components/StylesNavbar"

import NavStyles from "../styles/navbar.module.scss";
interface Props {
  history: {
    push(url: string): void;
  };
}
export default function Navbar(props: Props): JSX.Element {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated, authState } = authContext;

  const [dropDown, setDropDown] = useState(false)

  if(authState.name){
    var initials = authState.name.split(' ').map(function(item){return item[0]}).join('')
  }
  

  const logout = (): void => {
    axios
      .post(`${config.API_URL}/users/logout`, {}, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(false)
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

 

  return (
    <NavContainer primary>
      {isAuthenticated ? (
        <>
        <NavLinks primary>
          <NavLink to="/home" activeClassName={NavStyles.activeNav}><NavItem primary>Dashboard</NavItem></NavLink>
         <NavLink to="/calendar" activeClassName={NavStyles.activeNav}> <NavItem primary>Calendar</NavItem></NavLink>
          <NavLink to="/job-board" activeClassName={NavStyles.activeNav}><NavItem primary>Job Board</NavItem></NavLink>
          <NavLink to="/tasks" activeClassName={NavStyles.activeNav}><NavItem primary>Tasks</NavItem></NavLink>
          <NavLink to="/preperation" activeClassName={NavStyles.activeNav}><NavItem primary>Preperation</NavItem></NavLink>
          </NavLinks>
          <div>
         <ProfilePic onClick={()=>setDropDown(!dropDown)}> {initials}</ProfilePic>
         {dropDown ? <StyledDropDown logout={logout} authState={authState}></StyledDropDown>:null}
        </div>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Link to="/">Landing</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </NavContainer>
  );
}
