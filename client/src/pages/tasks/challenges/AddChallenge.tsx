import React from "react";
import {
  CardContainer,
  CardContent,
} from "../../../styles/styled-components/StyledContainers";
import DatePicker from "react-datepicker";

const AddChallenge = (props) => {
  const {
    addChallenge,
    setDateCheck,
    dateCheck,
    startDate,
    setStartDate,
    jobState,
    setJobId,
  } = props;
  return (
    <>
      <div onSubmit={(e) => addChallenge(e)}>
          <CardContent >
            <form>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
              <input
                type="text"
                id="url"
                name="url"
                placeholder="Url"
                required
              />
              <input
                type="text"
                id="repo"
                name="repo"
                placeholder="Repo"
                required
              />

              <input type="submit" value="Add Challenge" />
            </form>
            <div>
              <p>
                Select Deadline?
                <input
                  type="checkbox"
                  onChange={() => {
                    setDateCheck(!dateCheck);
                  }}
                ></input>
              </p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div>
              <p>Is this challenge for a job you have saved?</p>
              {jobState
                ? jobState.map((job) => {
                    return (
                      <button onClick={() => setJobId(job.job_id)}>
                        {job.job_title} at {job.company_name}
                      </button>
                    );
                  })
                : null}
            </div>
          </CardContent>
      </div>
    </>
  );
};

export default AddChallenge;
