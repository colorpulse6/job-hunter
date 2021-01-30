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
                name:"companyName",
                label:"Company Name",
                required:true

               },
               {
                type:"text",
                name:"jobTitle",
                label:"Job Title ",
                required:true

               },
               {
                type:"text",
                name:"jobDescription",
                label:"Description",
                required:true

               }
              ]}
            />

          </form>
        </CardContent>
    </>
  );
};

export default AddJob;
