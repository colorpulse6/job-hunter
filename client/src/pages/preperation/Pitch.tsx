import React, { useContext, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import { PreperationContext } from "../../context/PreperationContext";
import PrepNav from "./PrepNav";
import { PageContainer } from "../../styles/styled-components/StyledContainers";
import { StyledTextField } from "../../styles/styled-components/StyledElements"

const Pitch = () => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;

  useEffect(() => {
    document.getElementById("pitch").innerHTML = preperationState.pitch;
  });

  const savePitch = (e) => {
    e.preventDefault()
    const pitch = e.target.value;
    console.log(pitch);

    axios
      .post(
        `${config.API_URL}/preperation/pitch/edit-pitch`,
        {
          pitch,
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

  return (
    <>
      <PrepNav />
      <PageContainer withSecondNav>
      <h3>Pitch</h3>

        <StyledTextField
          name="pitch"
          id="pitch"
          placeholder="Please Enter a Pitch"
          onChange={savePitch}
        ></StyledTextField>

      </PageContainer>
    </>
  );
};

export default Pitch;
