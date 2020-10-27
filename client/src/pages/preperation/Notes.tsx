import React, { useContext } from "react";
import axios from "axios";
import config from "../../config";
import { PreperationContext } from "../../context/PreperationContext";
import Preperation from "./Preperation"

const Notes = () => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;

  const addNote = (e) => {
    e.preventDefault();
    // let target = e.currentTarget as any;
    const note = e.target.note.value;
    console.log(note);
    axios
      .post(
        `${config.API_URL}/preperation/notes/add-note`,
        {
          note,
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

  const removeNote = (note) => {
    console.log(note);
    axios
      .post(
        `${config.API_URL}/preperation/notes/delete-note`,
        {
          note,
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
      <Preperation />
      <form onSubmit={(e) => addNote(e)}>
        <input
          type="text"
          id="note"
          name="note"
          placeholder="Please Enter a Note"
          required
        />
        <input type="submit" value="Add Note" />
      </form>
      <div>
        <h3>Notes</h3>
        {preperationState.preperation_notes
          ? preperationState.preperation_notes.map((note, index) => {
              return (
                <div key={index}>
                  <p>{note}</p>
                  <button onClick={() => removeNote(note)}>X</button>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Notes;
