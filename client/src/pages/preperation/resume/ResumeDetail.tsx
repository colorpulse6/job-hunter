import React, { useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { RouteComponentProps } from "react-router-dom";
import { PreperationContext } from "../../../context/PreperationContext";
import {StyledPdf} from "../../../styles/styled-components/StyledPdf";
import {StyledButton} from "../../../styles/styled-components/StyledElements";

type TParams = {
  resumeCategoryName: string;
};

const ResumeDetail = (props) => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
  console.log(preperationState);

const {resumeCategoryName} = props

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
    console.log(index);
    axios
      .post(
        `${config.API_URL}/preperation/resume-category/delete-resume-url`,
        {
          index,
          resumeCategoryName,
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
    <div>
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
          <input  type="file" id="file" name="file" onChange={showText} />
          <label htmlFor="file">Upload Resume</label>
          <p className="image-uploaded hide" id="resumeImageUploaded">
            Image Uploaded!
          </p>{" "}
          <StyledButton type="submit">Save</StyledButton>
        </form>
        <div>
          <h3>Resume</h3>
          {preperationState.resume_category
            ? preperationState.resume_category.map((category, index) => {
                if (category.category_name === resumeCategoryName) {
                  return (
                    <div key={index}>
                      <StyledPdf src={category.resume_upload_url}
                      />
                      {/* <button onClick={(index)=>removeResumeUpload(index)}>X</button><p></p> */}
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
