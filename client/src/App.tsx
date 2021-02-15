import React, {useState, useEffect, useContext} from "react";
import { Switch, Route, withRouter, useLocation, BrowserRouter } from "react-router-dom";
import { ModalContainer, ModalRoute } from "react-router-modal";
import PrivateRoute from './components/PrivateRoute'
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/Profile";
import Calendar from "./pages/calendar/CalendarPage";
import JobBoard from "./pages/jobBoard/JobBoard";
import JobContacts from "./pages/jobBoard/job/JobContacts";

import Tasks from "./pages/tasks/Tasks";
import Todos from "./pages/tasks/todos/Todos";
import Challenges from "./pages/tasks/challenges/Challenges";
import Learning from "./pages/tasks/learning/Learning";

import Preperation from "./pages/preperation/Preperation";
import InterviewQuestions from "./pages/preperation/interview-questions/InterviewQuestions";
import Skills from "./pages/preperation/skills/Skills";
import CareerGoals from "./pages/preperation/career-goals/CareerGoals";
import Resume from "./pages/preperation/resume/Resume";
import ResumeDetail from "./pages/preperation/resume/ResumeDetail";
import Pitch from "./pages/preperation/Pitch";

import Notes from "./pages/preperation/Notes";
import CoverLetter from "./pages/cover-letters/CoverLetter";
import CoverLetterDetail from "./pages/cover-letters/CoverLetterDetail";

import Navbar from "./components/Navbar";
import PrepNotesHelper from "./components/PrepNotesHelper"
import { AuthProvider, AuthContext } from "./context/AuthContext";

import { JobProvider } from "./context/JobContext";
import { TaskProvider } from "./context/TaskContext";
import { EventProvider } from "./context/EventContext";
import { PreperationProvider } from "./context/PreperationContext";

import JobNav from "./components/Navbar";
import Loader from "./components/Loader"

import { IProps } from "./interfaces";
import "./styles/App.scss";

function App(props: IProps) {
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(()=>{
    
      setIsLoaded(true)

  }, [])

  if(!isLoaded){
    return <Loader/>
  }
  return (
    <AuthProvider>
      <JobProvider>
        <TaskProvider>
          <PreperationProvider>
            <EventProvider>
              <div className="App">
                <Navbar history={props.history} location={props.location} />
                <PrepNotesHelper /> 
                <Switch>
                  <Route path="/signup" component={Signup} />
                  <Route path="/login" component={Login} />

                  <Route exact path="/" component={Landing} />
                  
                  <PrivateRoute path="/home" component={Dashboard} />
                  <PrivateRoute path="/calendar" component={Calendar} />

                  <PrivateRoute exact path="/job-board" component={JobBoard} />

                  {/* <Route exact path="/job-board/job/:jobId" component={JobNav} /> */}
                  {/* <Route exact path="/job-board/:jobId/job-overview" component={JobOverview} /> */}
                  {/* <Route exact path="/job-board/:jobId/job-contacts" component={JobContacts} />
                <Route path="/job-board/:jobId/job-tasks" component={JobTasks} />
                <Route path="/job-board/:jobId/job-notes" component={JobNotes} /> */}

                  <PrivateRoute exact path="/tasks" component={Tasks} />
                  <PrivateRoute exact path="/tasks/todos" component={Todos} />
                  <PrivateRoute path="/tasks/challenges" component={Challenges} />
                  <PrivateRoute path="/tasks/learning" component={Learning} />

                  <PrivateRoute exact path="/preperation" component={Preperation} />
                  <PrivateRoute
                    path="/preperation/interview-questions"
                    component={InterviewQuestions}
                  />
                  <PrivateRoute path="/preperation/skills" component={Skills} />
                  <PrivateRoute
                    path="/preperation/career-goals"
                    component={CareerGoals}
                  />

                  <PrivateRoute path="/preperation/pitch" component={Pitch} />
                  
                  <PrivateRoute path="/preperation/notes" component={Notes} />
                  <PrivateRoute exact path="/preperation/resume" component={Resume} />
                  <PrivateRoute
                    path="/preperation/resume/:resumeCategoryName"
                    component={ResumeDetail}
                  />
                  <PrivateRoute
                    exact
                    path="/preperation/cover-letter"
                    component={CoverLetter}
                  />
                  <PrivateRoute
                    path="/preperation/cover-letter/:coverLetterCategoryName"
                    component={CoverLetterDetail}
                  />
                  <PrivateRoute path="/profile" component={Profile} />
                </Switch>
              </div>
              <ModalContainer />
            </EventProvider>
          </PreperationProvider>
        </TaskProvider>
      </JobProvider>
    </AuthProvider>
  );
}

export default withRouter(App);
