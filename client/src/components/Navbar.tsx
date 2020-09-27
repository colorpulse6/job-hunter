import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { AuthContext } from "../context/AuthContext";

interface Props {
  history: {
    push(url: string): void;
  };
}
export default function Navbar(props: Props): JSX.Element {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, setIsAuthenticated } = authContext;

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
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      Navbar
      {isAuthenticated ? (
        <div>
          <Link to="/home">Home</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/job-board">Job Board</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/preperation">Preperation</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/">Landing</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </div>
  );
}
