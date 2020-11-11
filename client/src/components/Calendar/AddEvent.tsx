import React from 'react'
import { Card, CardContent } from "../../styles/styled-components/StylesCard";

let curr = new Date();
curr.setDate(curr.getDate() + 3);
let date = curr.toISOString().substr(0, 10)

const AddEvent = (props) => {
    return (
        <div>
            <Card addJob>
        <CardContent addJob>
          <form
            onSubmit={(e) => 
              props.addEvent(e)
              
            }
          >
            <div>
              <input
                type="time"
                id="title"
                name="title"
                placeholder="Add Title"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="startTime"
                name="startTime"
                placeholder="Start Time"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="endTime"
                name="endTime"
                placeholder="End Time"
              />
            </div>
            <div>
              <input
                type="date"
                id="date"
                name="date"
                defaultValue={date}
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="allDay"
                onChange={props.handleAllDay}
              />
              <p>All Day?</p>
            </div>

            <div>
              <input type="submit" value="Add Event" />
            </div>
          </form>
        </CardContent>
      </Card>
            
        </div>
    )
}

export default AddEvent
