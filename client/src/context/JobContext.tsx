import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { IJObs, InitialJobsState, ContextProps} from '../interfaces'

const JobContext = createContext(null);


const JobProvider: React.FC<ContextProps> = ({ children }) => {

    const [jobState, setJobs] = useState([{
      
    }]);

    useEffect(() => {

        //Jobs

        
        getJobs()
      
    }, []);
    const getJobs = () => {
        axios
        .get(`${config.API_URL}/jobs`, { withCredentials: true })
        .then((res) => {
            setJobs(res.data)
            console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }

    console.log(jobState)


    const setJob = (jobs) => {
        setJobs(jobs);
      };
   
   
  
    return (
        <>
        {jobState ? <JobContext.Provider
            value={{
              jobState: jobState,
              getJobs: getJobs,
            }}
          >
            {children}
          </JobContext.Provider>: <p>loading</p>}
      </>
    );
  };
  export { JobContext, JobProvider };
