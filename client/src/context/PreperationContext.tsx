import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { ContextProps } from "../interfaces";


const PreperationContext = createContext(null);

const PreperationProvider: React.FC<ContextProps> = ({ children }) => {
  const [preperationState, setPreperation] = useState([{}]);

  useEffect(() => {
    getPreperation();
    
  }, []);

  const getPreperation = () => {
    axios
      .get(`${config.API_URL}/preperation`, { withCredentials: true })
      .then((res) => {
        setPreperation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      
        <PreperationContext.Provider
          value={{
            preperationState,
            getPreperation,
          }}
        >
          {children}
        </PreperationContext.Provider>
    
    </>
  );
};
export { PreperationContext, PreperationProvider };