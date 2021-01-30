import React, { useState } from "react";
import { dateFormated, currentTimeFormated, timePlusHour } from "../../javascript/DateFunctions"
import Form from "../../components/Form";

import { CardContent } from "../../styles/styled-components/StyledContainers";
import {
  StyledForm,
} from "../../styles/styled-components/StylesMain";
import { StyledSubmit } from "../../styles/styled-components/StyledElements";



const AddEvent = (props) => {

  const [allDay, setAllDay] = useState(false)

  let defaultTimeStart = currentTimeFormated;
  let defaultTimeEnd = timePlusHour.slice(0, -3);
  
  return (
    <div>
        <CardContent>
          <StyledForm onSubmit={(e) => props.addEvent(e)}>
            
            <Form
            noSubmit
            auth
            title="Add Title"
            inputs={[
              {
                type: "text",
                id: "title",
                name: "title",
                label: "Add Title",
                required: true,
              },
             
            ]}
          />

            <div className="date-time">
              <div className="input-container">
                <input
                  className="date-input"
                  type="date"
                  id="date"
                  name="date"
                  defaultValue={dateFormated}
                  
                />
              </div>
              <div className="input-container">
                <input
                  className="time-input"
                  type="time"
                  id="startTime"
                  name="startTime"
                  defaultValue={defaultTimeStart}
                  disabled={allDay}
                  style={{color:allDay ?"lightgrey" : "", backgroundColor:allDay ? "White" : ""}}
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
                  disabled={allDay}
                  style={{color:allDay ?"lightgrey" : "", backgroundColor:allDay ? "White" : ""}}
                />
              </div>
            </div>

            <div>
              <input
                type="checkbox"
                id="allDay"
                name="allDay"
                onChange={()=>setAllDay(!allDay)}
              />
              <p>All Day?</p>
            </div>

            <div>
              <StyledSubmit type="submit" value="Add Event" />
            </div>
          </StyledForm>
        </CardContent>
    </div>
  );
};

export default AddEvent;
