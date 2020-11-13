import React, { useState } from "react";
import { Card, CardContent } from "../../styles/styled-components/StylesCard";
import {
  StyledForm,
  StyledInput,
  StyledSubmit,
} from "../../styles/styled-components/StylesMain";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import DateTimePicker from "react-datetime-picker";

let curr = new Date();
curr.setDate(curr.getDate() + 3);
let date = curr.toISOString().substr(0, 10);
let currentTime = new Date(new Date().getTime()).toLocaleTimeString();
let defaultTimeStart = currentTime.slice(0, -3);
let timePlusHour = new Date(
  new Date().getTime() + 1 * 60 * 60 * 1000
).toLocaleTimeString();
let defaultTimeEnd = timePlusHour.slice(0, -3);
console.log(defaultTimeStart);

const AddEvent = (props) => {
  const [eventDate, setEventDate] = useState(new Date());
  const [eventStartTime, setEventStartTime] = useState(curr);

  return (
    <div>
      <div>
        <CardContent>
          <StyledForm onSubmit={(e) => props.addEvent(e, eventDate)}>
            <div>
              <StyledInput
                type="text"
                autoFocus={true}
                id="title"
                name="title"
                placeholder="Add Title"
                required
              />
            </div>

            <div className="date-time">
              <div className="input-container">
                <input
                  className="date-input"
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={date}
                  required
                />
              </div>
              <div className="input-container">
                <input
                  className="time-input"
                  type="time"
                  id="startTime"
                  name="startTime"
                  defaultValue={defaultTimeStart}
                  required
                />
              </div>
              -
              <div className="input-container">
                <input
                  className="time-input"
                  type="time"
                  id="endTime"
                  name="endTime"
                  placeholder="End Time"
                  defaultValue={defaultTimeEnd}
                />
              </div>
            </div>

            <div>
              <input
                type="checkbox"
                id="allDay"
                name="allDay"
                // onChange={props.handleAllDay}
              />
              <p>All Day?</p>
            </div>

            <div>
              <StyledSubmit type="submit" value="Add Event" />
            </div>
          </StyledForm>
        </CardContent>
      </div>
    </div>
  );
};

export default AddEvent;
