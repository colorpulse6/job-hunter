import React, { useEffect} from "react";
import { StyledSubmit } from "../styles/styled-components/StyledElements";
import InputComp from "./Input";

const Form = (props) => {

  const { inputs, title, noSubmit, hasBackground, smallText, value, onChange, auth, addDate, editJobDates, challenge, putButton, removeEdits,removeChallenge, onClick } = props;

  useEffect(()=>{
    // console.log(editJobDates)
  })
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
          auth,
          addDate,
          editJobDates,
          challenge, 
          putButton,
          removeEdits,
          onClick
          
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
