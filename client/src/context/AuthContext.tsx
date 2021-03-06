import React, { useState, useEffect, createContext, ContextType } from "react";
import axios from "axios";
import config from "../config";
import { IUser, InitialAuthState, ContextProps } from "../interfaces";
import Loader from "../components/Loader";

const AuthContext = createContext<any>(null);

const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  const [isAuthenticated, checkAuthenticated] = useState(false);
  const [authState, setAuthState] = useState<InitialAuthState>({
    userInfo: {},
  });
  const [gotData, setGotData] = useState(null);

  const getUser = () => {
    axios
      .get(`${config.API_URL}/user`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setAuthState(res.data);
          checkAuthenticated(true);
          setGotData(true);
        }
      })
      .catch((err) => {
        setGotData(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const setAuthInfo = (userInfo: IUser) => {
    setAuthState(userInfo);
  };
  const setIsAuthenticated = (arg: boolean) => {
    checkAuthenticated(arg);
  };

  if (gotData === null) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        setGotData,
        gotData,
        isAuthenticated,
        setIsAuthenticated: (arg: boolean) => setIsAuthenticated(arg),
        setAuthState: (authInfo: IUser) => setAuthInfo(authInfo),
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
