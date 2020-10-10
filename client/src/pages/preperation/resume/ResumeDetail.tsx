import React, { useContext } from "react";
import axios from "axios";
import config from "../../../config";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
} from "react-router-dom";
import { PreperationContext } from "../../../context/PreperationContext";

type TParams = {
    resumeCategoryName: string;
};

const ResumeDetail = ({ match }: RouteComponentProps<TParams>) => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
  console.log(preperationState);

  const resumeCategoryName = match.params.resumeCategoryName;

  const uploadResume = (e) => {
    let resumeUploadUrl = e.target.file.files[0];
    let uploadData = new FormData();
    uploadData.append("imageUrl", resumeUploadUrl);
    axios
      .post(`${config.API_URL}/upload-img`, uploadData)
      .then((res) => {
        let resumeUpload = res.data.secure_url;
        console.log(resumeUpload);
        axios
          .patch(
            `${config.API_URL}/preperation/resume-category/${resumeCategoryName}/upload-resume`,
            { resumeUpload },
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

  const addResume = (e) => {
    e.preventDefault();
    uploadResume(e)
    let resumeUrl = e.target.resumeUrl.value;
    let resumeUploadUrl = e.target.file.files[0];
    let index 
    preperationState.resume_category.forEach((category)=> {
      if(category.category_name === resumeCategoryName){
        return index = preperationState.resume_category.indexOf(category)
      }
    })
    console.log(index)
    // axios
    //   .post(
    //     `${config.API_URL}/preperation/resume-category/${resumeCategoryName}/add-resume-url`,
    //     {
    //       resumeUrl,
    //       resumeUploadUrl,
    //       resumeCategoryName
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((result) => {
    //     getPreperation();
    //     console.log(result.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response.data.error);
    //   });
  };

  const removeResumeUrl = (index) => {
    console.log(index);
    axios
      .post(
        `${config.API_URL}/preperation/resume-category/${resumeCategoryName}/delete-resume-url`,
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

  const showText = () => {
    var element = document.getElementById("imageUploaded");
    element.classList.remove("hide");
  };

  return (
    <div>
      <div
        onSubmit={(e) => {
          addResume(e);
        }}
      >
        <form>
          <input
            type="text"
            id="resumeUrl"
            name="resumeUrl"
            placeholder="Add Resume Url"
            
          />
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={showText}
          />
          <label  htmlFor="file">
            Upload Resume
          </label>
          <p className="image-uploaded hide" id="imageUploaded">
            Image Uploaded!
          </p>{" "}
          <button type="submit">Save</button>
        </form>
        <div>
          <h3>Resume</h3>
         
        </div>
      </div>
    </div>
  );
};

export default ResumeDetail;
