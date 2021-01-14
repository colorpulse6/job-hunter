import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({logout, authState, className, setDropDown}) => {
  return (
    <div className={className}
    onMouseLeave={() => setDropDown(false)}>
        <p>{authState.name}</p>
        
      <Link to="/profile">Settings</Link>
      <a onClick={() => logout()}>Logout</a>
    </div>
  );
};

export default Dropdown;
