import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { PreperationContext } from "../../../context/PreperationContext";
import PrepNav from "../PrepNav";
import {
  PageContainer,
  Card,
  Flex,
} from "../../../styles/styled-components/StyledContainers";
import AddSingle from "../../../components/AddSingle";
import TrashIcon from "../../../assets/trash-icon.png";
import { StyledIcon } from "../../../styles/styled-components/StyledElements";
import { HeaderSecondary } from "../../../styles/styled-components/StyledText";
import ResumeDetail from "../resume/ResumeDetail";
import CoverLetterDetail from "../../cover-letters/CoverLetterDetail";

const DocumentComp = (props) => {
  const preperationContext = useContext(PreperationContext);
  // const { preperationState, getPreperation } = preperationContext;
  // console.log(preperationState);
  const [categoryDisplay, setCategoryDisplay] = useState("");

  let { addSlug, removeSlug, state, getPreperation } = props;

  const addCategory = (e) => {
    e.preventDefault();
    // let target = e.currentTarget as any;
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
      <PageContainer withSecondNav>
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
          <div style={{ marginTop: "-50px" }}>
            <h3>Categories</h3>
            {state && state.length > 0 ? (
              state.map((category, index) => {
                return (
                  <Flex even key={index}>
                    <div>
                      <StyledIcon
                        small
                        style={{ height: "20px", marginTop: "45px" }}
                        src={TrashIcon}
                        onClick={() => removeCategory(index)}
                      />
                    </div>
                    <div>
                      <div className="underline-container">
                        <span
                          className={
                            categoryDisplay === category.category_name
                              ? "active-category"
                              : "hover hover-1"
                          }
                        >
                          <HeaderSecondary
                            largeFont
                            onClick={() =>
                              setCategoryDisplay(category.category_name)
                            }
                          >
                            {category.category_name}
                          </HeaderSecondary>
                        </span>
                      </div>
                    </div>
                  </Flex>
                );
              })
            ) : (
              <p>Please add a category</p>
            )}
          </div>

          {state
            ? state.map((category, index) => {
                if (category.category_name === categoryDisplay) {
                  return props.resume ? (
                    <ResumeDetail
                      resumeCategoryName={category.category_name}
                      preperationState = {state}
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
