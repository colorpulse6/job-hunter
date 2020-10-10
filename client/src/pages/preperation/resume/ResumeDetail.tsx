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
  console.log(preperationState.resume_category);

  const resumeCategoryName = match.params.resumeCategoryName;

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
          uploadResume(e);
        }}
      >
        <form>
          {/* <input
            type="text"
            id="resumeUrl"
            name="resumeUrl"
            placeholder="Add Resume Url"
            
          /> */}
          <input type="file" id="file" name="file" onChange={showText} />
          <label htmlFor="file">Upload Resume</label>
          <p className="image-uploaded hide" id="imageUploaded">
            Image Uploaded!
          </p>{" "}
          <button type="submit">Save</button>
        </form>
        <div>
          <h3>Resume</h3>
          {preperationState.resume_category ? preperationState.resume_category.map((category)=> {
            if(category.category_name===resumeCategoryName){
              return <embed src={category.resume_upload_url} type="application/pdf"   height="700px" width="500" />


            }
          }): null}
         
        </div>
      </div>
    </div>
  );
};

export default ResumeDetail;
