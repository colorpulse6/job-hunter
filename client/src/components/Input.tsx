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
  onChange,
  auth,
  addDate,
  editJobDates,
  challenge,
  putButton
) => {
  const [datePickerIsOpen, setDatePicker] = useState(false);

  return (
    <>
      <FloatingLabelContainer
        hasBackground={hasBackground}
        smallText={smallText}
        addDate={addDate}
        challenge={challenge}
      >
        <input
          type={type}
          id={id}
          name={name}
          required
          value={value}
          onChange={!auth ? (e) => onChange(e, id) : null}
          onClick={addDate ? () => setDatePicker(!datePickerIsOpen) : null}
        />
        <span className="highlight">
          {" "}
          {putButton && value ? (
            <button style={{ position: "relative", left: "360px" }}>x</button>
          ) : null}
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
        />
      ) : null}
    </>
  );
};

export default InputComp;
