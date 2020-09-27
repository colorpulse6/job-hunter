import { ReactNode } from "react";


/*CONTEXT*/
export  interface IUser {
    userInfo: {
      id: string;
      name: string;
      email: string;
      password: string;
    };
  }
  
  export  interface InitialAuthState {
    userInfo: {};
  }
  
  export  interface IAuth {
    isAuthenticated: boolean;
  }
  
  export  type ContextProps = {
    children: ReactNode;
  };



  export interface IProps {
    history: {
      push(url: string): void;
    };
  }