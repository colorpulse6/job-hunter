import React, { useContext } from "react";
import axios from "axios";
import config from "../../../config";
import { 
    BrowserRouter as Router,
    Route,
    Link,
    RouteComponentProps
} from 'react-router-dom';
import { PreperationContext } from "../../../context/PreperationContext";

type TParams = {
    
        resumeCategoryId:string
    
}


const ResumeDetail= ({ match }:RouteComponentProps<TParams> ) => {
    const preperationContext = useContext(PreperationContext);
    const { preperationState, getPreperation } = preperationContext;
    console.log(preperationState);
   

    const resumeCategoryId = match.params.resumeCategoryId

    const addResume = (e) => {
      e.preventDefault();
      // let target = e.currentTarget as any;
      const category = e.target.category.value;

      axios
        .post(
          `${config.API_URL}/preperation/resume-category/${resumeCategoryId}/add-resume`,
          {
            category,
           
          },
          { withCredentials: true }
        )
        .then((result) => {
          getPreperation()
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
      <div onSubmit={(e) => addResumeCategory(e)}>
        <form>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Add Category"
            required
          />
         

          <input type="submit" value="Add Resume Category" />
        </form>
        <div>
          <h3>Resume</h3>
          {preperationState.resume_category
            ? preperationState.resume_category.map((category, index) => {
                return (
                  <div key={index}>
                    <Link to={`/preperation/resume-category/${category.category_name}`}>{category.category_name}</Link>
                    <button onClick={() => removeResumeCategory(index)}>X</button>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
}

export default ResumeDetail
