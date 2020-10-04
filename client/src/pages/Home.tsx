import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Home(): JSX.Element {
  const authContext = useContext(AuthContext);
  const { authState } = authContext;
console.log(authState)
  return (
    <div>
      {authState.userInfo ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Home Page</h1>
          <h5>Hello {authState.name}</h5>
        </div>
      )}
    </div>
  );
}
