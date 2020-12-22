import React from "react";
import { CardContent } from "../../styles/styled-components/StylesCard";
import Form from "../../components/Form"

const AddJob = (props) => {
  return (
    <>
        <CardContent>
        <div>
              <input
                type="checkbox"
                id="inputStar"
                onChange={props.handleStar}
              />
              <p>Star Job?</p>
            </div>
          <form
            onSubmit={(e) => 
              props.addJob(e)
              
            }
          >
            <Form 
             auth
             smallText
             inputs={[
             
               {
                type:"text",
                id:"companyName",
                name:"companyName",
                label:"Company Name",
                required:true

               },
               {
                type:"text",
                id:"jobTitle",
                name:"jobTitle",
                label:"Job Title ",
                required:true

               },
               {
                type:"text",
                id:"jobDescription",
                name:"jobDescription",
                label:"Description",
                required:false

               }
              ]}
            />

            {/* <div>
              <input type="submit" value="Add Job" />
            </div> */}
          </form>
        </CardContent>
    </>
  );
};

export default AddJob;
