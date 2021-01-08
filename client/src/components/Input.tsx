import React, { useState, useEffect } from "react";
import { FloatingLabelContainer } from "../styles/styled-components/StyledElements";
import DatePicker from "react-datepicker";

const InputComp = (
  label,
  type,
  id,
  name,
  hasBackground,
  smallText,
  value,
  required,
  onChange,
  auth,
  addDate,
  editJobDates,
  challenge,
  putButton,
  removeEdits,
  onClick,
  goalInput
  
) => {
  const [datePickerIsOpen, setDatePicker] = useState(false);

  return (
    <div>
      <FloatingLabelContainer
        hasBackground={hasBackground}
        smallText={smallText}
        addDate={addDate}
        challenge={challenge}
        value={value}
        goalInput={goalInput}
      >
        <input
          type={type}
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={!auth ? (e) => onChange(e, id)
            : null}
          onClick={addDate ? () => setDatePicker(!datePickerIsOpen) : null}
          onFocus={onClick}
        />
        {putButton && value && !challenge ? (
            <button onClick={(e)=>removeEdits(e,name, id)} style={{ position: "relative", left: "360px", top: challenge ? "-33px":"" }}>x</button>
          ) : null}
        <span className="highlight">
          {" "}
          
        </span>
        <span className="bar"></span>
        <label>{label}</label>
      </FloatingLabelContainer>
  
      
      {addDate && label !== "Challenge" ? (
        <DatePicker
          selected={new Date()}
          onChange={(e) => {
            editJobDates(e, id, name);
            setDatePicker(!datePickerIsOpen);
          }}
          open={datePickerIsOpen}
          shouldCloseOnSelect={true}
          className="date-picker"
          onClickOutside={()=>setDatePicker(false)}
        />
      ) : null}
    
    </div>
  );
};

export default InputComp;
