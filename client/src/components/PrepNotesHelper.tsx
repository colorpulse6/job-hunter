import React, { useState, useContext, useEffect } from "react";

import Notes from "../pages/preperation/Notes";
import styled, { css } from "styled-components";
import { styleVariables } from "../styles/design-tokens/style-variables";
import { ToggleMenu } from "../styles/styled-components/StyledAssets";
import downArrow from "../assets/down-arrow.png";
import upArrow from "../assets/up-arrow.png";
import { NONAME } from "dns";

const HelperWindow = styled.div`
  width: 150px;
  height: ${(props) => (props.show ? "260px" : "20px")};
  padding: 10px;
  padding-right: 20px;
  position: fixed;
  right: 20px;
  top: ${(props) => (props.show ? "400px" : "625px")};
  z-index: 50;
  border: 1px solid black;
  border-radius: ${styleVariables.rounded_corners_l};
  background-color: var(--color-third);
`;

const PrepNotesHelper = () => {
  const [showWindow, setShowWindow] = useState(false);

  return (
    <HelperWindow show={showWindow}>
      {showWindow ? (
        <>
          <h3>Notes</h3>
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
          <ToggleMenu src={downArrow} />
        </button>
      )}
    </HelperWindow>
  );
};

export default PrepNotesHelper;
