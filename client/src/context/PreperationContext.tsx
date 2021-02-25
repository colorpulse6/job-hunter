import React, { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { ContextProps } from "../interfaces";
import { AuthContext } from "../context/AuthContext";

const PreperationContext = createContext(null);

const PreperationProvider: React.FC<ContextProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { authState, isAuthenticated } = authContext;
  const [preperationState, setPreperation] = useState([{}]);

  useEffect(() => {
    if (isAuthenticated) {
      getPreperation();
    }
  }, [isAuthenticated]);

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
