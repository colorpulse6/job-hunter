import React, { useContext, useEffect } from "react";
import { PreperationContext } from "../context/PreperationContext";
import Notes from '../pages/preperation/Notes'
import styled, { css } from "styled-components";
import { styleVariables } from "../styles/design-tokens/style-variables";

const HelperWindow = styled.div`
  width: 150px;
  height: 300px;
  padding:0px;
  position: fixed;
  right: 170px;
  top: 330px;
  z-index:50;
  border:1px solid black;
`;
const PrepNotesHelper = () => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
  const { preperation_notes } = preperationState;

  return <HelperWindow><Notes helper></Notes> </HelperWindow>;
};

export default PrepNotesHelper;
