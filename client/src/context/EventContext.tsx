import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { ContextProps } from "../interfaces";

const EventContext = createContext(null);

const EventProvider: React.FC<ContextProps> = ({ children }) => {
  const [eventState, setEvents] = useState([{}]);

  useEffect(() => {
    getEvents();
  }, []);
  const getEvents = () => {
    axios
      .get(`${config.API_URL}/events`, { withCredentials: true })
      .then((res) => {
        if(res.data){
          setEvents(res.data);
          console.log(res.data)
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {eventState ? (
        <EventContext.Provider
          value={{
            eventState,
            getEvents,
          }}
        >
          {children}
        </EventContext.Provider>
      ) : null}
    </>
  );
};
export { EventContext, EventProvider };
