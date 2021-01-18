import React from "react";
import SidebarContent from "./SidebarContent";

const Sidebar = (props) => {
  const { removeCategory, categoryDisplay, setCategoryDisplay, state, sidebarIsOpen,
    setSidebarIsOpen } = props;

  return (
    <div>
      <SidebarContent
        removeCategory={removeCategory}
        categoryDisplay={categoryDisplay}
        setCategoryDisplay={setCategoryDisplay}
        prepState={state}
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
    </div>
  );
};

export default Sidebar;
