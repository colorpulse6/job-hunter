import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "../context/AuthContext";

export default function Home(): JSX.Element {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;

  console.log(authState);

  return (
    <div>
      Home Page
      {authState.userInfo ? <p>{authState.userInfo.name}</p> : null}
      
    </div>
  );
}
