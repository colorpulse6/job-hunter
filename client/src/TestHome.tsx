import React from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { ModalSwitch, ModalRoute } from "react-router-modal-gallery";
import Modal from "./components/Modal"
import TestContent from  "./TestContent"
const TestHome = (props) => {
  return (
      <>
    {/* <ModalSwitch
    renderModal={({ open, redirectToBack }) => (
      <Modal open={open} scroll="body" onExited={redirectToBack}>
        <ModalRoute
          defaultParentPath="/movies"
          path="/test-page"
          component={TestContent}
        />
        <ModalRoute
          defaultParentPath="/directors"
          path="/directors/:id"
          component={Director}
        />
      </Modal>
    )}
  >
    <Route exact path="/movies" component={Movies} />
    <Route exact path="/directors" component={Directors} />
    <Route path="/movies/:id" component={Movie} />
    <Route path="/directors/:id" component={Director} />
  
    {/* If you want to redirect on 404 not found */}
    {/* <Route path="*" render={() => <Redirect to="/movies" />} />
  </ModalSwitch>; */} 
  </>
  );
};

export default TestHome;
