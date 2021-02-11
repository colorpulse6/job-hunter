import React, { useContext, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import { PreperationContext } from "../../context/PreperationContext";
import PrepNav from "./PrepNav";
import { PageContainer } from "../../styles/styled-components/StyledContainers";
import { StyledTextField } from "../../styles/styled-components/StyledElements";

const Notes = (props) => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;

  useEffect(() => {
    document.getElementById("prepNotes").innerHTML =
      preperationState.preperation_notes;
  }, [preperationState.preperation_notes]);

  const addNote = (e) => {
    e.preventDefault();
    const notes = e.target.value;
    axios
      .post(
        `${config.API_URL}/preperation/notes/add-notes`,
        {
          notes,
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

  const notesField = () => {
    return (<StyledTextField
      name="prepNotes"
      id="prepNotes"
      onChange={addNote}
      placeholder={!preperationState.preperation_notes ? "Type Notes Here" : null}
    />)
  }

  return (
    <>
      {!props.helper ? <PrepNav /> : null}
      {props.helper ? (
        <>{notesField()}</>
      ) : (
        <PageContainer withSecondNav helper={props.helper}>
          <h3>Notes</h3>
          {notesField()}
        </PageContainer>
      )}
    </>
  );
};

export default Notes;
