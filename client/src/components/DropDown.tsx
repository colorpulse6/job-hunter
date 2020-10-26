import React from "react";
import { Link } from "react-router-dom";

const Dropdown = (props) => {
  const { styles, logout, authState } = props;
  return (
    <div className={styles.dropdown}>
        <p>{authState.name}</p>
        
      <Link to="/profile">Settings</Link>
      <a onClick={() => logout()}>Logout</a>
    </div>
  );
};

export default Dropdown;
