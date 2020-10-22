import React from 'react'
import { EventInput } from '@fullcalendar/react'
import { JobContext } from "../../context/JobContext";
import {useContext} from "react"
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today


let jobsAdded = []

export const GetJobs = () => {
    const jobContext = useContext(JobContext);
    const { jobState } = jobContext;
    return jobState.map((job)=>{
        return jobsAdded.push({jobCompany:job.company_name, date:job.date_added})
    })
}


export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00'
  },
//   {
//       id: createEventId(),
//       title:`Applied to ${jobsAdded[0].jobCompany}`,
//       start: jobsAdded[0].date.toISOString().replace(/T.*$/, '')
//   }
]

export function createEventId() {
    return String(eventGuid++)
  }