import React from 'react';
import { Switch, Route, withRouter, RouteComponentProps } from "react-router-dom";
import Signup from './pages/Signup'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Home from './pages/Home'

import Calendar from './pages/Calendar'
import JobBoard from './pages/JobBoard'
import Tasks from './pages/Tasks'
import Preperation from './pages/Preperation'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import { AuthProvider } from "./context/AuthContext"



import './App.css';
interface Props {
  history: {
      push(url: string): void;
  };
}
function App(props:Props) {  

  
  return (
    <AuthProvider>
    <div>
      <Navbar 
      history={props.history}/>
      <Switch>
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />

        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />

        <Route path="/calendar" component={Calendar} />
        <Route path="/job-board" component={JobBoard} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/preperation" component={Preperation} />
        <Route path="/profile" component={Profile} />



      </Switch>
      
    </div>
    </AuthProvider>
  );
}

export default withRouter(App);
