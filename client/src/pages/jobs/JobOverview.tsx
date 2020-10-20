import React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";


const JobOverview= (props) => {

  return (
    <div>
      <div>
        <div>
          <h3>Job Overview</h3>

          {
            <div>
              <p>Company: {props.company_name}</p>

              <p>Job Title: {props.job_title}</p>
              <p>Description: {props.job_description}</p>
          <p>Category: {Object.keys(props).find((key) => props[key] === true)}</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default withRouter(JobOverview as any);
