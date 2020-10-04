import React from 'react'
import { Link } from "react-router-dom"

export default function Preperation():JSX.Element  {
    return (
        <div>
            Preperation Page

            <Link to={{pathname:"/preperation/interview-questions"}}>Interview Questions</Link>

            <Link to={{pathname:"/preperation/hard-skills"}}>Hard Skills</Link> 

            <Link to={{pathname:"/preperation/career-goals"}}>Career Goals</Link> 

            <Link to={{pathname:"/preperation/resume"}}> Resume</Link> 
            
            <Link to={{pathname:"/preperation/pitch"}}> Pitch</Link> 
            
            <Link to={{pathname:"/preperation/soft-skills"}}>Soft Skills</Link> 
            
            <Link to={{pathname:"/preperation/notes"}}>Notes</Link> 
            
            <Link to={{pathname:"/preperation/cover-letters"}}>Cover Letters</Link>

            
            
        </div>
    )
}
