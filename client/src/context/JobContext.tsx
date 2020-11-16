import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { ContextProps, IJObs } from "../interfaces";

const JobContext = createContext(null);

const JobProvider: React.FC<ContextProps> = ({ children }) => {
  const [jobState, setJobs] = useState<Array<IJObs>>([
    {
      added_by: "",
      applied: false,
      archived: false,
      company_name: "",
      date_added: "",
      date_applied: "",
      denied: false,
      hired: false,
      incontact: false,
      interview1: false,
      interview2: false,
      interview3: false,
      job_contacts: false,
      job_description: "",
      job_id: null,
      job_notes: false,
      job_saved: false,
      job_tasks: false,
      job_category: "",
      job_title: "",
      star:null,
      tasks_open: false,
    },
  ]);
  const [jobsSaved, setJobsSaved] = useState(0);
  const [jobsApplied, setJobsApplied] = useState(0);
  const [jobsInterviewing, setJobsInterviewing] = useState(0);
  useEffect(() => {
    getJobs();
  }, []);

  useEffect(()=>{
    getJobStatus()
  }, [jobState])

  const getJobs = () => {
    axios
      .get(`${config.API_URL}/jobs`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setJobs(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getJobStatus = () => {
    setJobsSaved(0)
    setJobsApplied(0)
    setJobsInterviewing(0)
    jobState.map((job) => {
      if (job.job_saved) {
        setJobsSaved((jobsSaved) => jobsSaved + 1);
      }
      if (job.job_category === "applied") {
        setJobsApplied((jobsApplied) => jobsApplied + 1);
      }
      if (
        job.job_category === "interview_1" ||
        job.job_category === "interview_2" ||
        job.job_category === "interview_3"
      ) {
        setJobsInterviewing((jobsInterviewing) => jobsInterviewing + 1);
      }
    });
  };

  return (
    <>
      {jobState ? (
        <JobContext.Provider
          value={{
            jobState,
            jobsSaved,
            jobsApplied,
            jobsInterviewing,
            getJobs,
          }}
        >
          {children}
        </JobContext.Provider>
      ) : null}
    </>
  );
};
export { JobContext, JobProvider };
