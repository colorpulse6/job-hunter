import React, { useState } from "react";
import JobOverview from "./JobOverview";
import JobContacts from "./JobContacts";
import JobTasks from "./JobTasks";
import JobNotes from "./JobNotes";


const JobDetails = () => {
    const [page, setPage] = useState("")

  return (
    <div>
     
      <button onClick={()=>setPage("overview")}>Job Overview</button>
    {page === "overview" ?  <JobOverview /> : null}
      <button onClick={()=>setPage("contacts")}>Job Contacts</button>
      {page === "contacts" ?  <JobContacts/> : null}

      <button onClick={()=>setPage("tasks")}>Job Tasks</button>
      {page === "tasks" ?  <JobTasks/> : null}

      <button onClick={()=>setPage("notes")}>Job Notes</button>
      {page === "notes" ?  <JobNotes/> : null}

    </div>
  );
};

export default JobDetails;
