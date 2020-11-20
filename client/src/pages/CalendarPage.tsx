import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

import { AuthContext } from "../context/AuthContext";
import CalendarComp from "../components/Calendar/Calendar";
import { JobContext } from "../context/JobContext";
import { TaskContext } from "../context/TaskContext";
import { EventContext } from "../context/EventContext";

import Modal from "../components/Modal";
import AddEvent from "../components/Calendar/AddEvent";
import { DateSelectArg } from "@fullcalendar/react";
import { createEventId } from "../components/utils/event-utils";

import { PageContainer } from "../styles/styled-components/StyledContainers";
import MenuBars from "../assets/menu-bars.png";
import { Card, CardContent } from "../styles/styled-components/StylesCard";

import { Logo } from "../styles/styled-components/StylesNavbar";

export default function CalendarPage(): JSX.Element {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;
  // console.log(authState);
  const jobContext = useContext(JobContext);
  const { jobState } = jobContext;

  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;

  const eventContext = useContext(EventContext);
  const { eventState, getEvents } = eventContext;

  const {
    saved_job_goals_daily,
    saved_job_goals_weekly,
    saved_job_goals_monthly,
    applied_job_goals_daily,
    applied_job_goals_weekly,
    applied_job_goals_monthly,
  } = authState;

  const [menu, setMenu] = useState(false);
  const [eventAdded, setEventAdded] = useState(false);
  console.log(eventState);
  useEffect(() => {
    setEventAdded(false);
  });
  // const handleAddDate = () => {
  //   let title = prompt("Please enter a new title for your event");

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //     });
  //   }
  // };

  const handleAddEvent = (e, eventDate) => {
    e.preventDefault();
    let title = e.target.title.value;
    let date = eventDate.toISOString();
    let start_time = e.target.startTime.value;
    let end_time = e.target.endTime.value;
    let allday = e.target.allDay.checked;
    // console.log(allday)
    axios
      .post(
        `${config.API_URL}/events/add-event`,
        {
          title,
          date,
          start_time,
          end_time,
          allday,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setEventAdded(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PageContainer flex={menu}>
      <div>
        <button style={{ border: "none" }} onClick={() => setMenu(!menu)}>
          <Logo src={MenuBars} />
        </button>
        <Modal
          width={500}
          height="100%"
          content={<AddEvent addEvent={handleAddEvent} />}
          toggleOn={eventAdded}
          title={"Add Event"}
        ></Modal>

        {menu ? (
          <div>
            <h4>Goals</h4>

            <Card  short>
              <CardContent>
                <p>Saved Goals Daily: {saved_job_goals_daily}</p>
                <p>Saved Goals Weekly: {saved_job_goals_weekly}</p>
                <p>Saved Goals Monthly: {saved_job_goals_monthly}</p>
              </CardContent>
            </Card>
            <Card calendarGoals short>
              <CardContent>
                <p>Applied Goals Daily: {applied_job_goals_daily}</p>
                <p>Applied Goals Weekly: {applied_job_goals_weekly}</p>
                <p>Applied Goals Monthly: {applied_job_goals_monthly}</p>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>

      {jobState ? (
        <CalendarComp jobs={jobState} tasks={taskState} events={eventState} />
      ) : null}
    </PageContainer>
  );
}
