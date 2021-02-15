import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { Route, Redirect } from "react-router-dom";
import Loader from "../components/Loader";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, gotData } = authContext;
  const [isAuth, setIsAuth] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true)
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
        setIsAuth(true);
    }
  }, [isAuthenticated]);



  if (!isAuth && !isLoaded) {
    return <Loader />;
  }
 

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoaded && isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
