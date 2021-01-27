import React, {useEffect} from "react";
import axios from "axios";
import config from "../../config";
import { CalendarViewSelect } from "../../styles/styled-components/StyledElements";
const CalendarOptions = (props) => {
  const {
    weekendsVisible,
    handleWeekendsToggle,
    seeAllEvents,
    setSeeAllEvents,
    setEvents,
    see_deadlines,
    see_applied,
    see_added,
    see_other,
  } = props;

  useEffect(()=>{
    saveSettings()
  })
  
  const saveSettings = () => {
    axios
    .post(
      `${config.API_URL}/users/calendar-settings`,
      {
        weekendsVisible,
        seeAllEvents,
        see_deadlines,
        see_applied,
        see_added,
        see_other,
        
      },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};


  return (
    <>
      <label>
        <CalendarViewSelect
          type="checkbox"
          checked={weekendsVisible}
          onChange={handleWeekendsToggle}
        ></CalendarViewSelect>
        Toggle Weekends
      </label>
      <label >
        <CalendarViewSelect
          allEvents
          type="checkbox"
          onChange={() => {
            setSeeAllEvents(!seeAllEvents);
          }}
        ></CalendarViewSelect>
        See All Events
      </label>

      <label>
        <CalendarViewSelect
          otherEvents
          type="checkbox"
          onChange={(e) => {
            setEvents(3, e);
          }}
        ></CalendarViewSelect>
        See Other Events
      </label>

      <label>
        <CalendarViewSelect
          deadlines
          type="checkbox"
          onChange={(e) => {
            setEvents(0, e);
          }}
        ></CalendarViewSelect>
        See Deadlines
      </label>

      <label>
        <CalendarViewSelect
          jobsApplied
          type="checkbox"
          onChange={(e) => setEvents(1, e)}
        ></CalendarViewSelect>
        See Jobs Applied
      </label>
      <label>
        <CalendarViewSelect
          jobsAdded
          type="checkbox"
          onChange={(e) => setEvents(2, e)}
        ></CalendarViewSelect>
        See Jobs Added
      </label>
    </>
  );
};

export default CalendarOptions;
