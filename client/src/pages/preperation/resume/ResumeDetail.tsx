import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { RouteComponentProps } from "react-router-dom";
import { PreperationContext } from "../../../context/PreperationContext";
import { StyledPdf } from "../../../styles/styled-components/StyledPdf";
import {
  StyledButton,
  StyledIcon,
} from "../../../styles/styled-components/StyledElements";
import TrashIcon from "../../../assets/trash-icon.png";
import Zoom from "react-img-zoom";

type TParams = {
  resumeCategoryName: string;
};

const ResumeDetail = (props) => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;

  const { resumeCategoryName } = props;

  const uploadResume = (e) => {
    e.preventDefault();
    let index;
    preperationState.resume_category.forEach((category) => {
      if (category.category_name === resumeCategoryName) {
        return (index = preperationState.resume_category.indexOf(category));
      }
    });

    let resumeUploadUrl = e.target.file.files[0];

    let uploadData = new FormData();
    uploadData.append("resumeUploadUrl", resumeUploadUrl);
    axios
      .post(`${config.API_URL}/upload`, uploadData)
      .then((res) => {
        let resumeUploadUrl = res.data.secure_url;
        console.log(resumeUploadUrl);
        axios
          .post(
            `${config.API_URL}/preperation/resume-category/upload-resume`,
            { resumeUploadUrl, resumeCategoryName, index },
            { withCredentials: true }
          )
          .then((result) => {
            getPreperation();
            console.log(result.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const addResume = (e) => {
  //   e.preventDefault();
  //   // let resumeUrl = e.target.resumeUrl.value;
  //   let resumeUploadUrl = e.target.file.files[0];
  //   let index
  //   preperationState.resume_category.forEach((category)=> {
  //     if(category.category_name === resumeCategoryName){
  //       return index = preperationState.resume_category.indexOf(category)
  //     }
  //   })
  //   uploadResume(e, index, resumeCategoryName)

  //   axios
  //     .post(
  //       `/preperation/resume-category/add-resume-url`,
  //       {
  //         resumeCategoryName,
  //         index
  //       },
  //       { withCredentials: true }
  //     )
  //     .then((result) => {
  //       getPreperation();
  //       console.log(result.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data.error);
  //     });
  // };

  const removeResumeUpload = (index) => {
    //Used Index from props (category) to set upload_url to ""
    console.log(index);
    let resumeUploadUrl = "";
    axios
      .post(
        `${config.API_URL}/preperation/resume-category/delete-resume-url`,
        {
          index,
          resumeCategoryName,
          resumeUploadUrl,
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

  const showText = () => {
    var element = document.getElementById("resumeImageUploaded");
    element.classList.remove("hide");
  };

  return (
    <div
      style={{
        width: "60%",
        borderLeft: preperationState.resume_category[props.index]
          .resume_upload_url
          ? "2px solid #4285f4"
          : "",
        paddingLeft: "145px",
      }}
    >
      <form
        onSubmit={(e) => {
          uploadResume(e);
        }}
      >
        {/* <input
            type="text"
            id="resumeUrl"
            name="resumeUrl"
            placeholder="Add Resume Url"
            
          /> */}
        <div>
          <label htmlFor="file">Upload Resume</label>
          <input type="file" id="file" name="file" onChange={showText} />
        </div>
        <div className="image-uploaded hide" id="resumeImageUploaded">
          <p>Image Uploaded!</p>
          <StyledButton type="submit">Save</StyledButton>
        </div>{" "}
      </form>
      <div>
        {preperationState.resume_category
          ? preperationState.resume_category.map((category, index) => {
              if (
                category.category_name === resumeCategoryName &&
                category.resume_upload_url !== ""
              ) {
                return (
                  <div>
                    <h3>Resume</h3>
                    <div key={index}>
                      <Zoom
                        img={category.resume_upload_url}
                        zoomScale={1.5}
                        width={600}
                        height={600}
                      />
                      <StyledIcon
                        small
                        src={TrashIcon}
                        onClick={(index) => removeResumeUpload(props.index)}
                      />
                    </div>
                  </div>
                );
              }
            })
          : null}
      </div>
    </div>
  );
};

export default ResumeDetail;
