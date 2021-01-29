import React from "react";
import axios from "axios";
import config from "../../config";
import { CalendarViewSelect } from "../../styles/styled-components/StyledElements";

const CalendarOptions = (props) => {
  const { user, getUser } = props;

  const saveSettings = (e) => {
    let settings = { ...user.calendar_settings };
    axios
      .post(
        `${config.API_URL}/users/calendar-settings`,
        {
          ...settings,
          [e.target.name]: e.target.checked,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        settings = res.data.calendar_settings;
        getUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* Create checkboxes from settings data */}
      {Object.entries(user.calendar_settings).map((item, index) => {
        return (
          <>
            <CalendarViewSelect
              type="checkbox"
              name={item[0]}
              defaultChecked={item[1]}
              onChange={saveSettings}
              key={index}
              styleProps={item[0]}
            />
            <label style={{ textTransform: "capitalize", marginLeft:"-95px", marginTop:"1px" }}>
            {item[0].replace(/_/g, " ")}
          </label>
          </>
        );
      })}
    </>
  );
};

export default CalendarOptions;
