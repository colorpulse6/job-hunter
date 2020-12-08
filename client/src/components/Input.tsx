import React from "react";
import {FloatingLabelContainer} from "../styles/styled-components/StyledElements"
const InputComp = (label, type, id, hasBackground, smallText) => {
  return (
    <FloatingLabelContainer hasBackground={hasBackground} smallText={smallText}>
      <input type={type} id={id} required />
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>{label}</label>
    </FloatingLabelContainer>
  );
};

export default InputComp;
