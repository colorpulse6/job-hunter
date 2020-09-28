import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { IJObs, InitialJobsState, ContextProps} from '../interfaces'

const JobContext = createContext(null);


const JobProvider: React.FC<ContextProps> = ({ children }) => {

    const [jobState, setJobs] = useState({
      
    });

    useEffect(() => {
      axios
        .get(`${config.API_URL}/job-board/jobs`, { withCredentials: true })
        .then((res) => {
          setTimeout(()=> {
            setJobs(res.data)
            console.log(res.data)
          }, 1000)
          
        })
        .catch((err) => {
          console.log(err);
        });

    }, []);
    console.log(jobState)


  
   
   
  
    return (
        <>
        {jobState ? <JobContext.Provider
            value={{
              jobState: jobState
            }}
          >
            {children}
          </JobContext.Provider>: <p>loading</p>}
      </>
    );
  };
  export { JobContext, JobProvider };
