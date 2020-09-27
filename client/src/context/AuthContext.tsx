import React, { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";
import config from "../config";

interface IUser {
  userInfo: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
}

interface InitialUserState {
  userData: {}
}

interface InitialAuthState {
  userInfo: {};
}

type IProps = {
  children: ReactNode;
};

const AuthContext = createContext(null);

const AuthProvider: React.FC<IProps> = ({ children }) => {

  const [userData, getUserData] = useState<InitialUserState>({
    
      userData:{}
    
  });

  useEffect(() => {
    axios
      .get(`${config.API_URL}/user`, { withCredentials: true })
      .then((res) => {
        if(res.data){
          getUserData(res.data)
          setAuthState(res.data)
          console.log(res.data)
        }
     
      })
      .catch((err) => {
        console.log(err);
      });
      
      
  }, []);

  const [authState, setAuthState] = useState<InitialAuthState>({
    userInfo: userData ? userData : {}
  });

console.log(authState)
  const setAuthInfo = (userInfo: IUser) => {
    setAuthState(userInfo);
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: (authInfo:IUser) => setAuthInfo(authInfo),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
