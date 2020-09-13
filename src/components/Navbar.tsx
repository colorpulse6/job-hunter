import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar():JSX.Element {
    return (
        <div style={{display:'flex', justifyContent:'space-around'}}>
            Navbar
            <Link to ="/">Home</Link>
            <Link to ="/calendar">Calendar</Link>
            <Link to ="/job-board">Job Board</Link>
            <Link to ="/tasks">Tasks</Link>
            <Link to ="/preperation">Preperation</Link>
            <Link to ="/profile">Profile</Link>
        </div>
    )
}
