import React from "react";
import { StyledSubmit } from "../styles/styled-components/StyledElements";
import InputComp from "./Input";

const Form = (props) => {
  const { inputs, title, noSubmit, hasBackground, smallText, value, onChange } = props;

  return (
    <div>
      {inputs.map((input) => {
        return InputComp(
          input.label,
          input.type,
          input.id,
          input.name,
          hasBackground,
          smallText,
          input.value,
          onChange,
          
        );
      })}
      {noSubmit ? null : (
        <div>
          <StyledSubmit type="submit" value={title} />
        </div>
      )}
    </div>
  );
};

export default Form;
