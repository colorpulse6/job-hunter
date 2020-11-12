import React from 'react'
import { Card, CardContent } from "../../styles/styled-components/StylesCard";

let curr = new Date();
curr.setDate(curr.getDate() + 3);
let date = curr.toISOString().substr(0, 10)

const AddEvent = (props) => {
    return (
        <div>
            <div >
        <CardContent >
          <form
            onSubmit={(e) => 
              props.addEvent(e)
              
            }
          >
            <div>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Add Title"
                required
              />
            </div>
            <div>
            <input
                type="date"
                id="date"
                name="date"
                defaultValue={date}
              />
              <input
                type="time"
                id="startTime"
                name="startTime"
                placeholder="Start Time"
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
          </form>
        </CardContent>
      </div>
            
        </div>
    )
}

export default AddEvent
