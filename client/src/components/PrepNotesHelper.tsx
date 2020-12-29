import React, { useState, useContext, useEffect } from "react";

import Notes from "../pages/preperation/Notes";
import { Flex } from "../styles/styled-components/StyledContainers";
import styled, { css } from "styled-components";
import { styleVariables } from "../styles/design-tokens/style-variables";
import { StyledIcon } from "../styles/styled-components/StyledElements";
import { ToggleMenu } from "../styles/styled-components/StyledAssets";
import downArrow from "../assets/down-arrow.png";
import upArrow from "../assets/up-arrow.png";
import notesIcon from "../assets/notes-icon.png";

import { AuthContext } from "../context/AuthContext";

const HelperWindow = styled.div`
  width: ${props=>props.show ? "150px" : "40px"};
  height: ${(props) => (props.show ? "260px" : "30px")};
  padding: ${(props) => (props.show ? "10px" : "5px")};
  padding-right: 20px;
  position: fixed;
  right: ${props=>props.show ? "20px" : "130px"};
  top: ${(props) => (props.show ? "400px" : "644px")};
  z-index: 50;
  border: 2px solid var(--color-border);
  border-radius: ${styleVariables.rounded_corners_l};
  background-color: var(--color-bright);
  box-shadow: ${styleVariables.box_shadows}
`;

const PrepNotesHelper = () => {
  const [showWindow, setShowWindow] = useState(false);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  return (
    <>
      {isAuthenticated ? (
        <HelperWindow show={showWindow}>
          {showWindow ? (
            <>
              <Flex
                spaceBetween
                style={{ marginTop: "-12px", marginLeft: "5px" }}
              >
                <h3>Notes</h3>
                <StyledIcon
                  small
                  src={notesIcon}
                  style={{ height: "20px", marginTop: "20px" }}
                />
              </Flex>
              <Notes helper></Notes>{" "}
              <button
                onClick={() => setShowWindow(!showWindow)}
                style={{
                  border: "none",
                  background: "none",
                  position: "absolute",
                  bottom: "5px",
                  outline: "none",
                }}
              >
                <ToggleMenu src={upArrow} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowWindow(!showWindow)}
              style={{ border: "none", background: "none", outline: "none" }}
            >
              <Flex>
              <ToggleMenu src={downArrow} style={{height:"12px", marginTop:"10px"}} />
              <StyledIcon small src={notesIcon} style={{
              marginTop:"5px"}}  />
              </Flex>
            </button>
          )}
        </HelperWindow>
      ) : null}
    </>
  );
};

export default PrepNotesHelper;
