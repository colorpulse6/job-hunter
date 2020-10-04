import React, { useContext } from "react";
import axios from "axios";
import config from "../../config";
import { TaskContext } from "../../context/TaskContext";

const Challenges = () => {
  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;
  console.log(taskState);
  

  const addChallenge = (e) => {
    e.preventDefault();
    // let target = e.currentTarget as any;
    const name = e.target.name.value;
    const url = e.target.url.value;
    const repo = e.target.repo.value;

    axios
      .post(
        `${config.API_URL}/tasks/challenges/add-challenge`,
        {
          name,
          url,
          repo,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getTasks();
        console.log(result.data);

      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const removeChallenge = (index) => {
    console.log(index);
    axios
      .post(
        `${config.API_URL}/tasks/challenges/delete-challenge`,
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
    <div onSubmit={(e) => addChallenge(e)}>
      <form>
        <input type="text" id="name" name="name" placeholder="Name" required />
        <input type="text" id="url" name="url" placeholder="Url" required />
        <input type="text" id="repo" name="repo" placeholder="Repo" required />

        <input type="submit" value="Add Challenge" />
      </form>
      <div>
        <h3>Challenges</h3>
        {taskState.challenges
          ? taskState.challenges.map((challenge, index) => {
              return (
                <div key={index}>
                  <p>{challenge.name}</p>
                  <button onClick={() => removeChallenge(index)}>X</button>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Challenges;
