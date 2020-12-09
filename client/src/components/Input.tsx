import React from "react";
import { FloatingLabelContainer } from "../styles/styled-components/StyledElements";
const InputComp = (
  label,
  type,
  id,
  name,
  hasBackground,
  smallText,
  value,
  onChange,
  auth,
  challenge,
  handleChallenge
) => {
  return (
    <FloatingLabelContainer hasBackground={hasBackground} smallText={smallText}>
      <input
        type={type}
        id={id}
        name={name}
        required
        value={value}
        onChange={!auth ? (e) => onChange(e, id) : null}
        onClick={challenge ? handleChallenge : null}
      />
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>{label}</label>
    </FloatingLabelContainer>
  );
};

export default InputComp;
