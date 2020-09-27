import React, { useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "../context/AuthContext";

export default function Home(): JSX.Element {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  console.log(authState);
 
  return (
    
    <div>
      {authState.userInfo ? <p>Loading...</p>:  <div>Home Page
     { authState.name }
     </div>}
      
    </div>
  );
}
