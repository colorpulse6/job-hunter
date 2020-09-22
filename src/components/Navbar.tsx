import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
interface Props {
  history: {
      push(url: string): void;
  };
}
export default function Navbar(props:Props): JSX.Element {
  const logout = ():void => {
    axios
      .post(`${config.API_URL}/users/logout`)
      .then((result) => {
        console.log('this is result: ' + result.data)
        props.history.push("/")

      })
      .catch((err) => {
        console.log(err.response.data.error);
        props.history.push("/")

      });
  }
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      Navbar
      <Link to="/">Landing</Link>
      <Link to="/home">Home</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/job-board">Job Board</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/preperation">Preperation</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  );
}
