import React, {useState, useEffect, useContext} from "react";
import { AuthProvider, AuthContext } from "../context/AuthContext";

import { Switch, Route, withRouter, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;
    return(
    
    <Route {...rest} render={(props) => (
        isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  )}

  export default PrivateRoute