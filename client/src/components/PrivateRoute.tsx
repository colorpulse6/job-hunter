import React, { useState, useEffect, useContext } from "react";
import { AuthProvider, AuthContext } from "../context/AuthContext";

import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import Loader from "../components/Loader"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoaded, setLoaded] = useState(false);
  
  const authContext = useContext(AuthContext);
  const { isAuthenticated, authState } = authContext;
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      setLoaded(true);
    }
    
  }, [isAuthenticated]);

  if(!isLoaded){
      return <Loader/>
  }
  
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoaded ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
