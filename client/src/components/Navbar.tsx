import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { AuthContext } from "../context/AuthContext";
import { RouteProps } from "react-router";
import DropDown from '../components/DropDown'
import {
  NavContainer,
  NavLinks,
  NavItem,
} from "../styles/styled-components/StylesNavbar";

import {
  ProfilePic,
  ProfilePicEmpty,
  Logo,
} from "../styles/styled-components/StyledAssets";
import {HamburgerBars} from "../styles/styled-components/StylesNavbar"
import NavStyles from "../styles/navbar.module.scss";
import ToastIcon from "../assets/toaster.png";
import Hamburger from "../assets/menu-bars.png"
interface Props {
  history: {
    push(url: string): void;
  };
  location: RouteProps["location"];
}
export default function Navbar(props: Props): JSX.Element {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated, authState, setGotData } = authContext;

  const [dropDown, setDropDown] = useState(false);
  const [expand, setExpand] = useState(false)

  
  if (authState.name) {
    var initials = authState.name
      .split(" ")
      .map(function (item) {
        return item[0];
      })
      .join("");
  }

  const logout = (): void => {
    axios
      .post(`${config.API_URL}/users/logout`, {}, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(false);
        setGotData(false)
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
                

          <Link to="/home">
            <Logo src={ToastIcon} />
          </Link>
          <HamburgerBars src={Hamburger} onClick={()=>setExpand(!expand)}/>
          <NavLinks primary expand={expand}>
            <NavLink to="/home" activeClassName={NavStyles.activeNav} onClick={()=>setExpand(!expand)}>
              <NavItem primary>Dashboard</NavItem>
            </NavLink>
            <NavLink to="/calendar" activeClassName={NavStyles.activeNav} onClick={()=>setExpand(!expand)}>
              
              <NavItem primary>Calendar</NavItem>
            </NavLink>
            <NavLink to="/job-board" activeClassName={NavStyles.activeNav} onClick={()=>setExpand(!expand)}>
              <NavItem primary>Job Board</NavItem>
            </NavLink>
            <NavLink to="/tasks" activeClassName={NavStyles.activeNav} onClick={()=>setExpand(!expand)}>
              <NavItem primary>Tasks</NavItem>
            </NavLink>
            <NavLink to="/preperation" activeClassName={NavStyles.activeNav} onClick={()=>setExpand(!expand)}>
              <NavItem primary>Preparation</NavItem>
            </NavLink>
          </NavLinks>
          <div>
            {authState.profile_pic_url ? (
              <ProfilePic
                navBar
                active={props.location.pathname === "/profile"}
                onClick={() => setDropDown(!dropDown)}
                
                src={authState.profile_pic_url}
              />
            ) : (
              <ProfilePicEmpty
                navBar
                active={props.location.pathname === "/profile"}
                onClick={() => setDropDown(!dropDown)}
              >
                {initials}
              </ProfilePicEmpty>
            )}

            {dropDown ? (
              <DropDown
                logout={logout}
                authState={authState}
                setDropDown={setDropDown}
              />
            ) : null}
          </div>
        </>
      ) : null}
    </NavContainer>
  );
}
