import React, { useState, useEffect, createContext, ReactNode } from "react";
import axios from "axios";
import config from "../config";

interface IUser {
  userInfo:{
    id:string,
    name:string,
    email:string,
    password:string
  }
}

interface InitialUserState {
  userData:{
    id:string,
    name:string,
    email:string,
  }
}

interface InitialAuthState {
userInfo: {}
}

type IProps = {
  children: ReactNode;
};

const AuthContext = createContext(null);


const AuthProvider: React.FC<IProps> = ({ children }) => {
  const user = localStorage.getItem('userInfo')
  
useEffect(()=> {
  axios
  .get(`${config.API_URL}/user`, {withCredentials: true })
  .then((res) => {
    getUserData(res.data) 
  })
  .catch((err)=> {
      console.log(err)
  })
}, [])
 
  
  
  const [userData, getUserData] = useState<InitialUserState>({
    userData:{
      id:"",
      name:"",
      email:"",
    }
  })

  console.log(userData)
  const [authState, setAuthState] = useState<InitialAuthState>({
    userInfo: userData 
  });

  const setAuthInfo = (userInfo: IUser) => {
    // localStorage.setItem('userInfo', JSON.stringify(userInfo))
    
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
