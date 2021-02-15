import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../../../config";

import {
  StyledButton,
  StyledIcon,
} from "../../../styles/styled-components/StyledElements";
import TrashIcon from "../../../assets/trash-icon.png";
import Zoom from "react-img-zoom";
import confirmDelete from '../../../components/confirmDelete'

const ResumeDetail = (props) => {

  const { resumeCategoryName, preperationState, getPreperation } = props;

  const uploadResume = (e) => {
    e.preventDefault();
    let index;
    preperationState.forEach((category) => {
      if (category.category_name === resumeCategoryName) {
        return (index = preperationState.indexOf(category));
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

  const showText = (bool) => {
    if (bool) {
      var element = document.getElementById("resumeImageUploaded");
      element.classList.remove("hide");
    }
    if (!bool) {
      var element = document.getElementById("resumeImageUploaded");
      element.classList.add("hide");
    }
  };

  return (
    <div
      style={{
        width: "60%",
        marginTop:"-20px",
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
        <div className="image-upload-container">
          <label htmlFor="resume-file">
            <a style={{ cursor: "pointer" }}>Upload Resume</a>
          </label>
          <input
            type="file"
            id="resume-file"
            name="file"
            onChange={() => showText(true)}
            
          />
        </div>
        <div className="image-uploaded hide" id="resumeImageUploaded">
          <p>Image Uploaded!</p>
          <StyledButton
            type="submit"
            onClick={() => {
              showText(false);
            }}
          >
            Save
          </StyledButton>
        </div>{" "}
      </form>
      <div>
        {preperationState
          ? preperationState.map((category, index) => {
              if (
                category.category_name === resumeCategoryName &&
                category.resume_upload_url !== ""
              ) {
                return (
                  <div style={{ marginTop:"20px",
                }} key={index}>
                    
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
                        onClick={() => confirmDelete("Resume", removeResumeUpload, props.index) }
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
