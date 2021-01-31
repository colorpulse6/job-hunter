import React, { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import { ContextProps } from "../interfaces";
import { AuthContext } from "../context/AuthContext";

const EventContext = createContext<any>(null);

const EventProvider: React.FC<ContextProps> = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;
  const [eventState, setEvents] = useState([{}]);

  useEffect(() => {
    getEvents();
  }, [authState]);

  const getEvents = () => {
    axios
      .get(`${config.API_URL}/events`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setEvents(res.data);
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
