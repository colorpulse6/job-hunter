import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { Route, Redirect } from "react-router-dom";
import Loader from "../components/Loader";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
        setIsAuth(true);
    }
  }, [isAuthenticated]);

  if (isAuthenticated && !isAuth) {
    return <Loader />;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
