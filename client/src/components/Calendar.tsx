import React, {useState, useContext} from 'react'
import FullCalendar, { EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate, EventInput } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId } from './utils/event-utils'
import {IJObs} from "../interfaces"
import { JobContext } from "../context/JobContext";


const CalendarComp = (props) => {

const jobContext = useContext(JobContext);
  const { jobState } = jobContext;
  
    console.log(props.jobs)
    console.log(jobState)
  
  

 const [weekendsVisible, setWeekendsVisible] = useState(true)
 const [currentEvents, setCurrentEvents] = useState([])

   const eventGuid = 0
   const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today


    
//   const INITIAL_EVENTS: EventInput[] = [
//     {
//       id: createEventId(),
//       title: 'All-day event',
//       start: todayStr
//     },
//     {
//       id: createEventId(),
//       title: 'Timed event',
//       start: todayStr + 'T12:00:00'
//     },
//     {
//       id: createEventId(),
//       title: `Applied to ${props[1].company_name}`,
//       start: `${props[1].date_added}`.replace(/T.*$/, '') }
//   ]

const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({currentEvents.length})</h2>
          <ul>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  
    }
  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible)
  }

 const handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events)
  }



function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}



      
    return (
      <div className='demo-app'>
        {renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={weekendsVisible}
            initialEvents={props.jobs.map((job)=>{
                 return {id: createEventId(),
                          title: `Applied to ${job.company_name}`,
                          start: `${job.date_applied}`.replace(/T.*$/, '')}
            })} // alternatively, use the `events` setting to fetch from a feed
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
    )
        
  }

 
export default CalendarComp