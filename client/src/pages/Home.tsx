import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home(): JSX.Element {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;
 
  return (
    
    <div>
      {authState.userInfo ? <p>Loading...</p>:  <div>Home Page
     { authState.name }
     </div>}
      
    </div>
  );
}
