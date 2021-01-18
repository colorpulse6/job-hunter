import React from "react";
import SidebarContent from "./SidebarContent";

const Sidebar = (props) => {
  const { removeCategory, categoryDisplay, setCategoryDisplay, state } = props;

  return (
    <div>
      <SidebarContent
        removeCategory={removeCategory}
        categoryDisplay={categoryDisplay}
        setCategoryDisplay={setCategoryDisplay}
        prepState={state}
      />
    </div>
  );
};

export default Sidebar;
