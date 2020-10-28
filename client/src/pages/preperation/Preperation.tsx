import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

export default function Preperation(): JSX.Element {

  const history = useHistory()
  useEffect(()=> {
history.push('/preperation/interview-questions')
  })
  return (
    <div>
      {/* <div>
        <Link
          to={{ pathname: "/preperation/interview-questions" }}
        >
         <li>Interview Questions</li> 
        </Link>

        <Link
          to={{ pathname: "/preperation/hard-skills" }}
        >
         <li>Hard Skills</li> 
        </Link>

        <Link
          to={{ pathname: "/preperation/career-goals" }}
        >
         <li>Career Goals</li> 
        </Link>

        <Link
          to={{ pathname: "/preperation/pitch" }}
        >
          {" "}
          <li>Pitch</li> 
        </Link>

        <Link
          to={{ pathname: "/preperation/soft-skills" }}
        >
         <li>Soft Skills</li> 
        </Link>

        <Link
          to={{ pathname: "/preperation/notes" }}
        >
         <li>Notes</li> 
        </Link>

        <Link
          to={{ pathname: "/preperation/resume" }}
        >
          {" "}
          <li>Resume</li> 
        </Link>

        <Link
          to={{ pathname: "/preperation/cover-letter" }}
        >
         <li>Cover Letters</li> 
        </Link>
      </div> */}
    </div>
  );
}
