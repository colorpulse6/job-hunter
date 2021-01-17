import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { PreperationContext } from "../../../context/PreperationContext";
import PrepNav from "../PrepNav";
import { PageContainer, Card, Flex } from "../../../styles/styled-components/StyledContainers";
import AddSingle from "../../../components/AddSingle";
import TrashIcon from '../../../assets/trash-icon.png'
import {StyledIcon} from "../../../styles/styled-components/StyledElements";
import ResumeDetail from './ResumeDetail'

const Resume = () => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
  console.log(preperationState);
  const [categoryDisplay, setCategoryDisplay] = useState("")

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
          (input) => (input.value = "")
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
          pdfPage
        />
        <Flex >
        <div>
          <h3>Categories</h3>
          {preperationState.resume_category
            ? preperationState.resume_category.map((category, index) => {
                return (
                  <Flex  key={index}>
                   
                    <StyledIcon small style={{height:"20px", marginTop:"18px"}} src={TrashIcon} onClick={() => removeResumeCategory(index)} />
                      
                    <p onClick={()=>setCategoryDisplay(category.category_name)}>{category.category_name}</p>
                    
                  </Flex>
                );
              })
            : null}
        </div>
       
        {preperationState.resume_category
            ? preperationState.resume_category.map((category, index) => {
                if (category.category_name === categoryDisplay) {
                  return (
                    <div key={index} style={{width:"60%"}}>
                      <ResumeDetail resumeCategoryName={category.category_name}
                      />
                      {/* <button onClick={(index)=>removeResumeUpload(index)}>X</button><p></p> */}
                    </div>
                  );
                }
              })
            : null}
      

        </Flex>
        
      </PageContainer>
    </>
  );
};

export default Resume;
