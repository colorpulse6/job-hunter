import React, { useState, useEffect } from "react";
import { FloatingLabelContainer } from "../styles/styled-components/StyledElements";
import DatePicker from "react-datepicker";
import { StyledIcon } from "../styles/styled-components/StyledElements";
import TrashIcon from "../assets/trash-icon.png";
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
  goalInput,
  stretchInput,
  minimizeInputs
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
        stretchInput={stretchInput}
        minimizeInputs={minimizeInputs}
      >
        <input
          type={type}
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={!auth ? (e) => onChange(e, id) : null}
          onClick={addDate ? () => setDatePicker(!datePickerIsOpen) : null}
          onFocus={onClick}
        />
        {putButton && value && !challenge ? (
          <button
            onClick={(e) => removeEdits(e, name, id)}
            style={{
              position: "relative",
              left: "360px",
              top: challenge ? "-33px" : "",
              background: "none",
              border: "none",
            }}
          >
            <StyledIcon small src={TrashIcon} />
          </button>
        ) : null}
        <span className="highlight"> </span>
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
          onClickOutside={() => setDatePicker(false)}
        />
      ) : null}
    </div>
  );
};

export default InputComp;
