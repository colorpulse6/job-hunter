import React, { useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { PreperationContext } from "../../../context/PreperationContext";
import PrepNav from "../PrepNav";
import Trash from "../../../assets/trash-icon.png";
import {
  StyledButton,
  StyledIcon,
} from "../../../styles/styled-components/StyledElements";

import {
  PageContainer,
  Card,
} from "../../../styles/styled-components/StyledContainers";
import AddSingle from "../../../components/AddSingle";

const CareerGoals = () => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;

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
          (input) => (input.value = "")
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
    <>
      <PrepNav />
      <PageContainer withSecondNav>
        <Card flex shadow roundedCorners noBorder center large>
          <Card center noBorder>
            <AddSingle
              handleAddFunction={addGoal}
              title="Add Goal"
              id="goal"
              name="goal"
              label="Add Goal"
            />

            <div>
              {/* <h3>Career Goals</h3> */}
              <ol>
                {preperationState.career_goals
                  ? preperationState.career_goals.map((goal, index) => {
                      return (
                        <Card noBorder flex spaceBetween key={index}>
                          <li
                            className="show-numbers"
                            style={{ marginLeft: "10px" }}
                          >
                            {goal}
                          </li>
                          <StyledButton
                            noDisplay
                            onClick={() => removeGoal(goal)}
                          >
                            <StyledIcon small src={Trash}></StyledIcon>
                          </StyledButton>
                        </Card>
                      );
                    })
                  : null}
              </ol>
            </div>
          </Card>
        </Card>
      </PageContainer>
    </>
  );
};

export default CareerGoals;
