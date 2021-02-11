import React, { useState } from "react";
import {
  PageContainer,
  Card,
  Flex,
} from "../../../styles/styled-components/StyledContainers";
import { StyledSideBar } from "../../../styles/styled-components/StyledSideBar";
import TrashIcon from "../../../assets/trash-icon.png";
import { StyledIcon } from "../../../styles/styled-components/StyledElements";

import MenuBars from "../../../assets/menu-bars.png";

import { ToggleSideBar } from "../../../styles/styled-components/StyledAssets";

const SidebarIcon = ({ setSidebarIsOpen, sidebarIsOpen }) => {
  return (
    <span
      className={
        sidebarIsOpen ? "animation-button-open" : "animation-button-closed"
      }
      onClick={() => {
        setSidebarIsOpen(!sidebarIsOpen);
        console.log(sidebarIsOpen);
      }}
    >
      <ToggleSideBar src={MenuBars} small />
    </span>
  );
};

const SidebarContent = (props) => {
  const {
    removeCategory,
    categoryDisplay,
    setCategoryDisplay,
    prepState,
    sidebarIsOpen,
    setSidebarIsOpen,
  } = props;

  const renderLinks = () => {
    return (
      <>
        <div>
          <SidebarIcon
            sidebarIsOpen={sidebarIsOpen}
            setSidebarIsOpen={setSidebarIsOpen}
          />
        </div>

        <StyledSideBar
          className={sidebarIsOpen ? "opened-style" : "closed-style"}
        >
          <div>
            <h4 style={{ textAlign: "center" }}>Categories</h4>
          </div>

          {prepState && prepState.length > 0 ? (
            prepState.map((category, index) => {
              if(category.category_name) 
              {return (
                <Flex even key={index}>
                  <p>
                    <StyledIcon
                      small
                      style={{
                        height: "20px",
                        paddingLeft: "15px",
                      }}
                      src={TrashIcon}
                      onClick={() => removeCategory(index)}
                    />
                  </p>
                  <div>
                    <div className="underline-container">
                      <span
                        className={
                          categoryDisplay === category.category_name
                            ? "active-category"
                            : "hover hover-1"
                        }
                      >
                        <p
                          onClick={() =>
                            setCategoryDisplay(category.category_name)
                          }
                        >
                          {category.category_name}
                        </p>
                      </span>
                    </div>
                  </div>
                </Flex>
              );}
            })
          ) : (
            <div style={{width:"270px"}}>
            <p style={{textAlign:"center"}}>Please add a category</p>
            </div>
          )}
        </StyledSideBar>
      </>
    );
  };
  return <>{renderLinks()}</>;
};

export default SidebarContent;
