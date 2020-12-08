import React from "react";
import { FloatingLabelContainer } from "../styles/styled-components/StyledElements";
const InputComp = (label, type, id, name, hasBackground, smallText, value, onChange) => {
  return (
    <FloatingLabelContainer hasBackground={hasBackground} smallText={smallText}>
      <input type={type} id={id} name={name} required value={value} onChange={e=>onChange(e, id)}/>
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>{label}</label>
    </FloatingLabelContainer>
  );
};

export default InputComp;
