import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../../config";

import {
  PageContainer,
  Card,
  Flex,
} from "../../../styles/styled-components/StyledContainers";
import AddSingle from "../../../components/AddSingle";

import ResumeDetail from "../resume/ResumeDetail";
import CoverLetterDetail from "../../cover-letters/CoverLetterDetail";
import Sidebar from "./Sidebar";

const DocumentComp = (props) => {
  let { addSlug, removeSlug, state, getPreperation } = props;

  const [categoryDisplay, setCategoryDisplay] = useState("");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  useEffect(()=>{
    if(state && state[0]){
    setCategoryDisplay(state[0].category_name)

    }
  }, [state])

  const addCategory = (e) => {
    e.preventDefault();
    const category = e.target.category.value;
    
    axios
      .post(
        `${config.API_URL}/preperation/${addSlug}`,
        {
          category,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getPreperation();
        setSidebarIsOpen(true)
        setCategoryDisplay(category)
        Array.from(document.querySelectorAll("input")).forEach(
          (input) => (input.value = "")
        );
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const removeCategory = (index) => {
    console.log(index);
    axios
      .post(
        `${config.API_URL}/preperation/${removeSlug}`,
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
      <PageContainer
        withSecondNav
        className={sidebarIsOpen ? "opened-style" : "closed-style"}
      >
        
          <AddSingle
            handleAddFunction={addCategory}
            type="text"
            title="Add Category"
            id="category"
            name="category"
            required={true}
            label="Add Category"
            pdfPage
          />
        
        <Flex>
          <Sidebar
            removeCategory={removeCategory}
            categoryDisplay={categoryDisplay}
            setCategoryDisplay={setCategoryDisplay}
            state={state}
            sidebarIsOpen={sidebarIsOpen}
            setSidebarIsOpen={setSidebarIsOpen}
          />{" "}
          {state
            ? state.map((category, index) => {
                if (category.category_name === categoryDisplay) {
                  
                  return props.resume ? (
                    <ResumeDetail
                      resumeCategoryName={category.category_name}
                      preperationState={state}
                      getPreperation={getPreperation}
                      index={index}
                      key={index}
                    />
                  ) : props.coverLetter ? (
                    <CoverLetterDetail
                      coverLetterCategoryName={categoryDisplay}
                      preperationState={state}
                      index={index}
                      key={index}
                    />
                  ) : null;
                }
              })
            : null}
        </Flex>
      </PageContainer>
    </>
  );
};

export default DocumentComp;
