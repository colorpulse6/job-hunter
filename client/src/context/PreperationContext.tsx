import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { ContextProps } from "../interfaces";


const PreperationContext = createContext(null);

const PreperationProvider: React.FC<ContextProps> = ({ children }) => {
  const [preperationState, setPreperation] = useState([{}]);

  useEffect(() => {
    if(preperationState){}
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
      {preperationState ? (
        <PreperationContext.Provider
          value={{
            preperationState,
            getPreperation,
          }}
        >
          {children}
        </PreperationContext.Provider>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};
export { PreperationContext, PreperationProvider };