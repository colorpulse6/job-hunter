import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { ContextProps } from "../interfaces";

const JobContext = createContext(null);

const JobProvider: React.FC<ContextProps> = ({ children }) => {
  const [jobState, setJobs] = useState([{}]);

  useEffect(() => {
    getJobs();
  }, []);
  const getJobs = () => {
    axios
      .get(`${config.API_URL}/jobs`, { withCredentials: true })
      .then((res) => {
        if(res.data){
          setJobs(res.data);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {jobState ? (
        <JobContext.Provider
          value={{
            jobState,
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
