import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/Profile";
import Calendar from "./pages/calendar/CalendarPage";
import JobBoard from "./pages/jobBoard/JobBoard";

import Tasks from "./pages/tasks/Tasks";
import Todos from "./pages/tasks/todos/Todos";
import Challenges from "./pages/tasks/Challenges";
import Learning from "./pages/tasks/Learning";

import Preperation from "./pages/preperation/Preperation";
import InterviewQuestions from "./pages/preperation/InterviewQuestions";
import HardSkills from "./pages/preperation/HardSkills";
import CareerGoals from "./pages/preperation/CareerGoals";
import Resume from "./pages/preperation/resume/Resume";
import ResumeDetail from "./pages/preperation/resume/ResumeDetail"
import Pitch from "./pages/preperation/Pitch";
import SoftSkills from "./pages/preperation/SoftSkills";
import Notes from "./pages/preperation/Notes";
import CoverLetter from "./pages/cover-letters/CoverLetter";
import CoverLetterDetail from "./pages/cover-letters/CoverLetterDetail";


import Navbar from "./components/Navbar";

import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import { TaskProvider } from "./context/TaskContext";
import { EventProvider } from "./context/EventContext";

import { PreperationProvider } from "./context/PreperationContext";

import { IProps } from "./interfaces";
import "./styles/App.scss";


function App(props: IProps) {

  
  return (
    <AuthProvider>
      <JobProvider>
        <TaskProvider>
          <PreperationProvider>
          <EventProvider>
            <div className="App">
              <Navbar history={props.history} />
              <Switch>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />

                <Route exact path="/" component={Landing} />
                <Route path="/home" component={Dashboard} />
                <Route path="/calendar" component={Calendar} />

                <Route exact path="/job-board" component={JobBoard} />
                {/* <Route exact path="/job-board/job/:jobId" component={JobNav} /> */}
                {/* <Route exact path="/job-board/:jobId/job-overview" component={JobOverview} /> */}
                {/* <Route exact path="/job-board/:jobId/job-contacts" component={JobContacts} />
                <Route path="/job-board/:jobId/job-tasks" component={JobTasks} />
                <Route path="/job-board/:jobId/job-notes" component={JobNotes} /> */}

                <Route exact path="/tasks" component={Tasks} />
                <Route exact path="/tasks/todos" component={Todos} />
                <Route path="/tasks/challenges" component={Challenges} />
                <Route path="/tasks/learning" component={Learning} />

                <Route exact path="/preperation" component={Preperation} />
                <Route
                  path="/preperation/interview-questions"
                  component={InterviewQuestions}
                />
                <Route path="/preperation/hard-skills" component={HardSkills} />
                <Route
                  path="/preperation/career-goals"
                  component={CareerGoals}
                />
                
                <Route path="/preperation/pitch" component={Pitch} />
                <Route path="/preperation/soft-skills" component={SoftSkills} />
                <Route path="/preperation/notes" component={Notes} />
                <Route exact path="/preperation/resume" component={Resume} />
                <Route  path="/preperation/resume/:resumeCategoryName" component={ResumeDetail} />
                <Route
                  exact path="/preperation/cover-letter"
                  component={CoverLetter}
                />
                <Route  path="/preperation/cover-letter/:coverLetterCategoryName" component={CoverLetterDetail} />

                <Route path="/profile" component={Profile} />
              </Switch>
            </div>
            </EventProvider>
          </PreperationProvider>
        </TaskProvider>
      </JobProvider>
    </AuthProvider>
  );
}

export default withRouter(App);
