import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import CalendarComp from "./CalendarComp";
import Modal from "../../components/Modal";
import AddEvent from "./AddEvent";
import CalendarMenu from "./CalendarMenu";
import { AuthContext } from "../../context/AuthContext";
import { JobContext } from "../../context/JobContext";
import { TaskContext } from "../../context/TaskContext";
import { EventContext } from "../../context/EventContext";

import { PageContainer } from "../../styles/styled-components/StyledContainers";

import { ToggleMenu } from "../../styles/styled-components/StyledAssets";
import MenuBars from "../../assets/menu-bars.png";

export default function CalendarPage(): JSX.Element {
  const authContext = useContext(AuthContext);
  const { authState, getUser } = authContext;
  
  const jobContext = useContext(JobContext);
  const { jobState } = jobContext;

  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;

  const eventContext = useContext(EventContext);
  const { eventState, getEvents } = eventContext;

  const [menu, setMenu] = useState(false);
  const [eventAdded, setEventAdded] = useState(false);



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

  

  

  const handleAddEvent = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let date = e.target.date.value;
    let start_time = e.target.startTime.value;
    let end_time = e.target.endTime.value;
    let allday = e.target.allDay.checked;
    console.log(allday)
    console.log(date)
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
        getEvents()
        getUser()
        
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleDeleteEvent = (event_id) => {
   
    axios
      .post(
        `${config.API_URL}/events/delete-event`,
        {
          event_id
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        getEvents()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PageContainer>
      <div>
        <div
          style={{ border: "none", background: "none", cursor: "pointer" }}
          onClick={() => setMenu(!menu)}
        >
          {/* <ToggleMenu src={MenuBars} /> */}
        </div>
        <Modal
          content={<AddEvent addEvent={handleAddEvent} />}
          toggleOn={eventAdded}
          title={"Add Event"}
          calendar
        />

        {menu ? <CalendarMenu authState={authState} /> : null}
      </div>

      {(
        <CalendarComp jobs={jobState} tasks={taskState} events={eventState} user={authState} getUser={getUser} deleteEvent={handleDeleteEvent}  />
      )}
    </PageContainer>
  );
}
