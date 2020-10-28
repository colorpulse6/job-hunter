import React, { useContext } from "react";
import axios from "axios";
import config from "../../config";
import {Link} from 'react-router-dom';
import { PreperationContext } from "../../context/PreperationContext";
import PrepNav from "../preperation/PrepNav"

const CoverLetter = () => {
  
    const preperationContext = useContext(PreperationContext);
    const { preperationState, getPreperation } = preperationContext;
    console.log(preperationState);

    const addCoverLetterCategory = (e) => {
      e.preventDefault();
      // let target = e.currentTarget as any;
      const category = e.target.category.value;

      axios
        .post(
          `${config.API_URL}/preperation/cover-letter-category/add-cover-letter-category`,
          {
            category,
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

    const removeCoverLetterCategory = (index) => {
      console.log(index);
      axios
        .post(
          `${config.API_URL}/preperation/cover-letter-category/delete-cover-letter-category`,
          {
            index,
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
        <PrepNav/>
      
      <div onSubmit={(e) => addCoverLetterCategory(e)}>
        <form>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Add Category"
            required
          />
         

          <input type="submit" value="Add Cover Letter Category" />
        </form>
        <div>
          <h3>Cover Letter</h3>
          {preperationState.cover_letter_category
            ? preperationState.cover_letter_category.map((category, index) => {
                return (
                  <div key={index}>
                    <Link to={`/preperation/cover-letter/${category.category_name}`} >{category.category_name}</Link>
                    <button onClick={() => removeCoverLetterCategory(index)}>X</button>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      </div>
    );
 
};

export default CoverLetter;
