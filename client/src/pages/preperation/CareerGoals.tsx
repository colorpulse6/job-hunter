import React, { useContext } from "react";
import axios from "axios";
import config from "../../config";
import { PreperationContext } from "../../context/PreperationContext";

 const CareerGoals = () => {

    const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext


  const addGoal = (e) => {
    e.preventDefault();
    // let target = e.currentTarget as any;
    const goal = e.target.goal.value;
    console.log(goal);

    axios
      .post(
        `${config.API_URL}/preperation/career-goals/add-goal`,
        {
          goal,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getPreperation();
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const removeGoal = (goal) => {
    console.log(goal);
    axios
      .post(
        `${config.API_URL}/preperation/career-goals/delete-goal`,
        {
          goal,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getPreperation();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    return (
        <div>
            <form onSubmit={(e) => addGoal(e)}>
        <input
          type="text"
          id="goal"
          name="goal"
          placeholder="Please Enter a Goal"
          required
        />
        <input type="submit" value="Add Goal" />
      </form>
      <div>
        <h3>Career Goals</h3>
        {preperationState.career_goals
          ? preperationState.career_goals.map((goal, index) => {
              return (
                <div key={index}>
                  <p>{goal}</p>
                  <button onClick={() => removeGoal(goal)}>X</button>
                 
                </div>
              );
            })
          : null}
      </div>
            
        </div>
    )
}

export default CareerGoals
