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

import NavStyles from "../styles/navbar.module.scss";
import ToastIcon from "../assets/toaster.png";

interface Props {
  history: {
    push(url: string): void;
  };
  location: RouteProps["location"];
}
export default function Navbar(props: Props): JSX.Element {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated, authState } = authContext;

  const [dropDown, setDropDown] = useState(false);

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

          <NavLinks primary>
            <NavLink to="/home" activeClassName={NavStyles.activeNav}>
              <NavItem primary>Dashboard</NavItem>
            </NavLink>
            <NavLink to="/calendar" activeClassName={NavStyles.activeNav}>
              {" "}
              <NavItem primary>Calendar</NavItem>
            </NavLink>
            <NavLink to="/job-board" activeClassName={NavStyles.activeNav}>
              <NavItem primary>Job Board</NavItem>
            </NavLink>
            <NavLink to="/tasks" activeClassName={NavStyles.activeNav}>
              <NavItem primary>Tasks</NavItem>
            </NavLink>
            <NavLink to="/preperation" activeClassName={NavStyles.activeNav}>
              <NavItem primary>Preperation</NavItem>
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
