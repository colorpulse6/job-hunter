import React, { useState, useEffect } from "react";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  EventInput,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "../../components/utils/event-utils";
import AddButtonImg from "../assets/add-button.png";

import { AddButton } from "../../styles/styled-components/StylesMain";

const CalendarComp = (props) => {
  // console.log(props.tasks.challenges);

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  const [seeAllEvents, setSeeAllEvents] = useState(false);
  const [eventIndex, setEventIndex] = useState([]);
  const [calEvents, setCalEvents] = useState([]);

  let jobEventArray = props.jobs.map((job) => {
    return {
      id: createEventId(),
      title: `Applied to ${job.company_name}`,
      start: `${job.date_applied}`.replace(/T.*$/, ""),
      backgroundColor: "#1B4079",
    };
  });

  let jobsAddedArray = props.jobs.map((job) => {
    return {
      id: createEventId(),
      title: `Added ${job.company_name}`,
      start: `${job.date_added}`.replace(/T.*$/, ""),
      backgroundColor: "#CBDF90",
    };
  });

  if (props.tasks.todos) {
    var todoDeadlineArray = props.tasks.todos.map((todo) => {
      return {
        id: createEventId(),
        title: `Finish ${todo.content}`,
        start: `${todo.due_date}`.replace(/T.*$/, ""),
        backgroundColor: "#4D7C8A",
      };
    });
  } else {
    todoDeadlineArray = [];
  }

  if (props.tasks.challenges) {
    var challengeEventArray = props.tasks.challenges.map((challenge) => {
      return {
        id: createEventId(),
        title: `Finish ${challenge.name}`,
        start: `${challenge.due_date}`.replace(/T.*$/, ""),
        backgroundColor: "#7F9C96",
      };
    });
  } else {
    challengeEventArray = [];
  }
  if (props.events) {
    var otherEventArray = props.events.map((event) => {
      return {
        id: createEventId(),
        title: `${event.title}`,
        start: `${event.date}`.replace(/T.*$/, ""),
        backgroundColor: "#c0d6df",
      };
    });
  }
  console.log(props);

  var deadlineArray = [...challengeEventArray, ...todoDeadlineArray];

  var eventArray: any = [
    deadlineArray,
    jobEventArray,
    jobsAddedArray,
    otherEventArray,
  ];

  const setEvents = (index, e) => {
    if (e.target.checked) {
      setEventIndex([...eventIndex, index]);
    } else {
      setEventIndex(
        eventIndex.filter(function (val) {
          return val !== index;
        })
      );
    }
  };

  useEffect(() => {
    
    let array = [];

    eventIndex.map((el) => {
      array = [...array, ...eventArray[el]];
    });
    console.log(eventIndex);
    let filteredArray = array.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );
    setCalEvents(filteredArray);
  }, [eventIndex, seeAllEvents]);

  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          {/* <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul> */}
        </div>
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Events ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>

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
        </div>
      </div>
    );
  };
  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  function renderEventContent(eventContent: EventContentArg) {
    return (
      <>
        <b>{eventContent.timeText}</b>
        <i>{eventContent.event.title}</i>
      </>
    );
  }

  function renderSidebarEvent(event: EventApi) {
    // return (
    //   <li key={event.id}>
    //     <b>
    //       {formatDate(event.start!, {
    //         year: "numeric",
    //         month: "short",
    //         day: "numeric",
    //       })}
    //     </b>
    //     <i>{event.title}</i>
    //   </li>
    // );
  }

  return (
    <div className="demo-app">
      {renderSidebar()}
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={calEvents}
          // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
    </div>
  );
};

export default CalendarComp;
