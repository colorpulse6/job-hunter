import React from "react";
import { Card, CardContent } from "../styles/styled-components/StylesCard";

const JobInfo = (props) => {
  return (
    <div>
      <p>
        {props.category} Goal: {props.goal}
      </p>{" "}
      <button
        onClick={() => {
          console.log(props.info);
          props.handleEdit(props.info, props.column);
        }}
      >
        Edit
      </button>
    </div>
  );
};



const JobGoalsSettings = (props) => {
  return (
    <>
      <Card short>
        <CardContent>
          <h5>{props.title}</h5>

          {(props.goalsDaily && !props.editCheck) ||
          (props.goalsDaily &&
            props.editCheck &&
            props.infoCheck != `${props.column}job_goals_daily`) ? (
            <JobInfo
              category="Daily"
              goal={props.goalsDaily}
              info={`${props.column}job_goals_daily`}
              handleEdit={props.handleEdit}
              column={props.column}
            />
          ) : props.goalsDaily &&
            props.editCheck &&
            props.infoCheck === `${props.column}job_goals_daily` ? (
            <div>
              <input
                type="number"
                id="job_goals_daily"
                name={`${props.column}job_goals_daily`}
                placeholder="Daily"
                onChange={(e)=>props.handleChange(e, props.column)}
              />

              <input type="submit" value="Edit" />
            </div>
          ) : (
            <div>
              <input
                type="number"
                id="job_goals_daily"
                name={`${props.column}job_goals_daily`}
                placeholder="Daily"
                onChange={(e)=>props.handleChange(e, props.column)}              />
              <input type="submit" value="Set" />
            </div>
          )}
        </CardContent>
        <CardContent>
          {(props.goalsWeekly && !props.editCheck) ||
          (props.goalsWeekly &&
            props.editCheck &&
            props.infoCheck != `${props.column}job_goals_weekly`) ? (
            <JobInfo
              category="Weekly"
              info={`${props.column}job_goals_weekly`}
              goal={props.goalsWeekly}
              handleEdit={props.handleEdit}
              column={props.column}

            />
          ) : props.editCheck && props.infoCheck === props.goalsWeekly ? (
            <div>
              <input
                type="number"
                id="job_goals_weekly"
                name={`${props.column}job_goals_weekly`}
                placeholder="Weekly"
                onChange={(e)=>props.handleChange(e, props.column)}              />
              <input type="submit" value="Set" />
            </div>
          ) : (
            <div>
              <input
                type="number"
                id="job_goals_weekly"
                name={`${props.column}job_goals_weekly`}
                placeholder="Weekly"
                onChange={(e)=>props.handleChange(e, props.column)}              />
              <input type="submit" value="Set" />
            </div>
          )}
          <div>
            {(props.goalsMonthly && !props.editCheck) ||
            (props.goalsMonthly &&
              props.editCheck &&
              props.infoCheck != `${props.column}job_goals_monthly`) ? (
              <JobInfo
                category="Monthly"
                info={`${props.column}job_goals_monthly`}
                goal={props.goalsMonthly}
                handleEdit={props.handleEdit}
                column={props.column}
              />
            ) : props.editCheck && props.infoCheck === props.goalsMonthly ? (
              <div>
                <input
                  type="number"
                  id="job_goals_monthly"
                  name={`${props.column}job_goals_monthly`}
                  placeholder="Monthly"
                  onChange={(e)=>props.handleChange(e, props.column)}                />
                <input type="submit" value="Set" />
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  id="job_goals_monthly"
                  name={`${props.column}job_goals_monthly`}
                  placeholder="Monthly"
                  onChange={(e)=>props.handleChange(e, props.column)}                />
                <input type="submit" value="Set" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default JobGoalsSettings;
