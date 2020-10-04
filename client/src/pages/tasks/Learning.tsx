import React, { useContext } from "react";
import axios from "axios";
import config from "../../config";
import { TaskContext } from "../../context/TaskContext";

const Learning = () => {
  
    const taskContext = useContext(TaskContext);
    const { taskState, getTasks } = taskContext;
    console.log(taskState.learning);

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
          },
          { withCredentials: true }
        )
        .then((result) => {
          getTasks()
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
      <div onSubmit={(e) => addLearning(e)}>
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

          <input type="submit" value="Add Learning" />
        </form>
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
    );
 
};

export default Learning;
