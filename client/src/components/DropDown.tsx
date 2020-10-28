import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({logout, authState, className}) => {
  return (
    <div className={className}>
        <p>{authState.name}</p>
        
      <Link to="/profile">Settings</Link>
      <a onClick={() => logout()}>Logout</a>
    </div>
  );
};

export default Dropdown;
