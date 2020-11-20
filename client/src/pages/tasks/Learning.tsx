import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";
import { TaskContext } from "../../context/TaskContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskNav from "./TaskNav"
import {
  PageContainer,
} from "../../styles/styled-components/StyledContainers";

import { Card, CardContent } from "../../styles/styled-components/StylesCard"
const Learning = () => {
  
    const taskContext = useContext(TaskContext);
    const { taskState, getTasks } = taskContext;
    console.log(taskState.learning);

    const [startDate, setStartDate] = useState(new Date());
    const [dateCheck, setDateCheck] = useState(false);
    const [sendDate, setSendDate] = useState("");

    useEffect(() => {
      if (dateCheck) {
        console.log("SEND IT!");
        setSendDate(startDate.toISOString())
        console.log(sendDate);
      }
    });

    const addLearning = (e) => {
      e.preventDefault();
      // let target = e.currentTarget as any;
      const name = e.target.name.value;
      const tutorialUrl = e.target.tutorialUrl.value;

      axios
        .post(
          `${config.API_URL}/tasks/learning/add-learning`,
          {
            name,
            tutorialUrl,
            sendDate
          },
          { withCredentials: true }
        )
        .then((result) => {
          getTasks()
          Array.from(document.querySelectorAll("input")).forEach((input) => {
            input.value = "";
            if (input.type === "checkbox") {
              input.checked = false;
            }
          });
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    };

    const removeLearning = (index) => {
      console.log(index);
      axios
        .post(
          `${config.API_URL}/tasks/learning/delete-learning`,
          {
            index,
          },
          { withCredentials: true }
        )
        .then((result) => {
          getTasks();
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <>
        <TaskNav />
        <PageContainer>
      <div onSubmit={(e) => addLearning(e)}>
      <Card short>
        <CardContent>
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
            id="tutorialUrl"
            name="tutorialUrl"
            placeholder="Url"
            required
          />

          
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
      <input type="submit" value="Add Learning" />
        </form>
      </CardContent>
      </Card>
        <div>
          <h3>Learning</h3>
          {taskState.learning
            ? taskState.learning.map((learning, index) => {
                return (
                  <div key={index}>
                    <p>{learning.name}</p>
                    <button onClick={() => removeLearning(index)}>X</button>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      </PageContainer>
      </>

    );
 
};

export default Learning;
