import React, { useContext } from "react";
import axios from "axios";
import config from "../../config";
import { PreperationContext } from "../../context/PreperationContext";

const Pitch = () => {
    const preperationContext = useContext(PreperationContext);
    const { preperationState, getPreperation } = preperationContext
  
  
    const editPitch = (e) => {
      e.preventDefault();
      // let target = e.currentTarget as any;
      const pitch = e.target.pitch.value;
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
            input => (input.value = "")
          );
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err.response.data.error);
        });
    };
  
    
  
      return (
          <div>
              <form onSubmit={(e) => editPitch(e)}>
          <input
            type="text"
            id="pitch"
            name="pitch"
            placeholder="Please Enter a Pitch"
            required
          />
          <input type="submit" value="Edit Pitch" />
        </form>
        <div>
          <h3>Pitch</h3>
      {preperationState.pitch ? <p>{preperationState.pitch}</p>: null}
        </div>
              
          </div>
      )
}

export default Pitch

