import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import config from "../config";
import {IUser, InitialAuthState, ContextProps} from '../interfaces'

const AuthContext = createContext(null);

const AuthProvider: React.FC<ContextProps> = ({ children }) => {

  const [isAuthenticated, checkAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/user`, { withCredentials: true })
      .then((res) => {
        if(res.data){
          setAuthState(res.data)
          checkAuthenticated(true)
        }
     
      })
      .catch((err) => {
        console.log(err);
      });
      
      
  }, []);

  const [authState, setAuthState] = useState<InitialAuthState>({
    userInfo: {}
  });

  const setAuthInfo = (userInfo: IUser) => {
    setAuthState(userInfo);
  };
  const setIsAuthenticated = (arg) => {
    checkAuthenticated(arg)

  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        isAuthenticated,
        setIsAuthenticated: (arg) => setIsAuthenticated(arg),
        setAuthState: (authInfo:IUser) => setAuthInfo(authInfo),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
