import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ logout, authState, setDropDown }) => {
  return (
    <div className="arrow_box" onMouseLeave={() => setDropDown(false)}>
      <p>{authState.name}</p>
      <hr></hr>
      <Link to="/profile">Settings</Link>
      <a
        onClick={() => {
          logout();
          setDropDown(false);
        }}
        style={{ cursor: "pointer" }}
      >
        Logout
      </a>
    </div>
  );
};

export default Dropdown;
