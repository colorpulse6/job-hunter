import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import { CalendarViewSelect } from "../../styles/styled-components/StyledElements";
import { getSourceMapRange } from "typescript";

const CalendarOptions = (props) => {
  const {
    user,
    getUser,
  } = props;


  const saveSettings = (e) => {
    // console.log(e.target.checked)
    let settings = {...user.calendar_settings}
    axios
      .post(
        `${config.API_URL}/users/calendar-settings`,
        {
          ...settings, [e.target.name]: e.target.checked
        },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data);
        settings = res.data.calendar_settings
        getUser()
    

      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(()=>{
  //   Object.entries(user.calendar_settings).map((item, index) => {
  //     console.log(item[1])
  //   })
  // }, [])


  const CheckBoxes = (props) => {
    return (
      <label style={{textTransform: "capitalize"}}>
        <CalendarViewSelect
          type="checkbox"
          name={props.name}
          defaultChecked={props.defaultChecked}
          onChange={props.onChange}
        />
        {props.title}{" "}
      </label>
    );
  };

  return (
    <>
      {Object.entries(user.calendar_settings).map((item, index) => {
        return (
          <CheckBoxes
            name={item[0]}
            title={item[0].replace(/_/g, ' ')}
            defaultChecked={item[1]}
            onChange={saveSettings}
            key={index}
          />
        );
      })}

      {/* <label>
        <CalendarViewSelect
          type="checkbox"
          name="weekendsVisible"
          defaultChecked={user.calendar_settings.see_weekends}
          onChange={(e) => {
            handleWeekendsToggle();
            saveSettings(e);
          }}
        />
        Toggle Weekends
      </label>
      <label>
        <CalendarViewSelect
          allEvents
          type="checkbox"
          name="seeAllEvents"
          defaultChecked={user.calendar_settings.see_all}
          onChange={(e) => {
            setSeeAllEvents(!seeAllEvents);
            saveSettings(e);
          }}
        />
        See All Events
      </label>

      <label>
        <CalendarViewSelect
          otherEvents
          type="checkbox"
          name="see_other"
          defaultChecked={user.calendar_settings.see_other}
          onChange={(e) => {
            // setEvents(3, e);
            saveSettings(e);
          }}
        />
        See Other Events
      </label>

      <label>
        <CalendarViewSelect
          deadlines
          type="checkbox"
          name="see_deadlines"
          defaultChecked={user.calendar_settings.see_deadlines}
          onChange={(e) => {
            // setEvents(0, e);
            saveSettings(e);
          }}
        />
        See Deadlines
      </label>

      <label>
        <CalendarViewSelect
          jobsApplied
          type="checkbox"
          name="see_applied"
          defaultChecked={user.calendar_settings.see_applied}
          onChange={(e) => {
            // setEvents(1, e)
            saveSettings(e);
          }}
        />
        See Jobs Applied
      </label>
      <label>
        <CalendarViewSelect
          jobsAdded
          type="checkbox"
          name="see_added"
          defaultChecked={user.calendar_settings.see_added}
          onChange={(e) => {
            // setEvents(2, e)
            saveSettings(e);
          }}
        />
        See Jobs Added
      </label> */}
    </>
  );
};

export default CalendarOptions;
