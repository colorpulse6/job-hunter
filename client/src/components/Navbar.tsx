import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { AuthContext } from "../context/AuthContext";
import DropDown from "./DropDown"

import NavStyles from "./navbar.module.scss";
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
    <div className = {NavStyles.navContainer}>
      {isAuthenticated ? (
        <>
        <div className = {NavStyles.navLinks}>
          <NavLink to="/home" activeClassName={NavStyles.activeNav}><li>Dashboard</li></NavLink>
         <NavLink to="/calendar" activeClassName={NavStyles.activeNav}> <li>Calendar</li></NavLink>
          <NavLink to="/job-board" activeClassName={NavStyles.activeNav}><li>Job Board</li></NavLink>
          <NavLink to="/tasks" activeClassName={NavStyles.activeNav}><li>Tasks</li></NavLink>
          <NavLink to="/preperation" activeClassName={NavStyles.activeNav}><li>Preperation</li></NavLink>
          </div>
          <div>
         <li className={NavStyles.profilePic} onClick={()=>setDropDown(!dropDown)}> {initials}</li>
         {dropDown ? <DropDown styles={NavStyles} logout={logout} authState={authState}></DropDown>:null}
        </div>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Link to="/">Landing</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </div>
  );
}
