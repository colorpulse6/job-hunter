import React from 'react'

const CalendarOptions = (props) => {
    const { weekendsVisible, handleWeekendsToggle, seeAllEvents, setSeeAllEvents, setEvents} = props
    return (
        <>
        <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            Toggle Weekends
          </label>
        <label>
            <input
              type="checkbox"
              onChange={() => {
                setSeeAllEvents(!seeAllEvents);
              }}
              value="allEvents"
            ></input>
            See All Events
          </label>

          <label>
            <input
              type="checkbox"
              onChange={(e) => {
                setEvents(3, e);
              }}
              name="otherEvents"
            ></input>
            See Other Events
          </label>

          <label>
            <input
              type="checkbox"
              onChange={(e) => {
                setEvents(0, e);
              }}
              name="jobDeadlines"
            ></input>
            See Deadlines
          </label>

          <label>
            <input
              type="checkbox"
              onChange={(e) => setEvents(1, e)}
              name="jobsApplied"
            ></input>
            See Jobs Applied
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setEvents(2, e)}
              name="jobsAdded"
            ></input>
            See Jobs Added
          </label>
            
        </>
    )
}

export default CalendarOptions
