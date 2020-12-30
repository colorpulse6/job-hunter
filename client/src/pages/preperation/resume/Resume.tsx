import React, { useContext } from "react";
import axios from "axios";
import config from "../../../config";
import {Link} from 'react-router-dom';
import { PreperationContext } from "../../../context/PreperationContext";
import PrepNav from "../PrepNav"
import {
  PageContainer,
} from "../../../styles/styled-components/StyledContainers";
import AddSingle from "../../../components/AddSingle";



const Resume = () => {
  
    const preperationContext = useContext(PreperationContext);
    const { preperationState, getPreperation } = preperationContext;
    console.log(preperationState);

    const addResumeCategory = (e) => {
      e.preventDefault();
      // let target = e.currentTarget as any;
      const category = e.target.category.value;

      axios
        .post(
          `${config.API_URL}/preperation/resume-category/add-resume-category`,
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

    const removeResumeCategory = (index) => {
      console.log(index);
      axios
        .post(
          `${config.API_URL}/preperation/resume-category/delete-resume-category`,
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
      <>
<PrepNav />
      <PageContainer withSecondNav>
      <AddSingle
          handleAddFunction={addResumeCategory}
          type="text"
          title="Add Category"
          id="category"
          name="category"
          required={true}
          label="Add Category"
        />
        <div>
          <h3>Resume</h3>
          {preperationState.resume_category
            ? preperationState.resume_category.map((category, index) => {
                return (
                  <div key={index}>
                    <Link to={`/preperation/resume/${category.category_name}`} >{category.category_name}</Link>
                    <button onClick={() => removeResumeCategory(index)}>X</button>
                  </div>
                );
              })
            : null}
        </div>
      </PageContainer>
      </>


    );
 
};

export default Resume;


