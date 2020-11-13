import React from "react";
import { Card, CardContent } from "../../styles/styled-components/StylesCard";
import { StyledForm, StyledInput } from "../../styles/styled-components/StylesMain";

let curr = new Date();
curr.setDate(curr.getDate() + 3);
let date = curr.toISOString().substr(0, 10);
let time = new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString()
const AddEvent = (props) => {
  return (
    <div>
      <div>
        <CardContent>
          <StyledForm onSubmit={(e) => props.addEvent(e)}>
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
              <input type="date" id="date" name="date" defaultValue={date} />
              <input
                type="time"
                id="startTime"
                name="startTime"
                defaultValue={time}
                required
              />
              <input
                type="time"
                id="endTime"
                name="endTime"
                placeholder="End Time"
              />
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
              <input type="submit" value="Add Event" />
            </div>
          </StyledForm>
        </CardContent>
      </div>
    </div>
  );
};

export default AddEvent;
