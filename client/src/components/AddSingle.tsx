import React from 'react'
import Form from "./Form";
import {
  StyledForm,
  StyledButton,
} from "../styles/styled-components/StyledElements";

const AddSingle = (props) => {
    let { handleAddFunction, setButton, buttonCheck, title, id, name } = props

    return (
        <>
        <StyledForm noBackground row onSubmit={(e) => {handleAddFunction(e);
         setButton(false)}} style={{marginBottom:"50px"}}>
        <Form
          title={title}
          smallText
          auth
          noSubmit
          onClick={()=>setButton(true)}
          inputs={[
            {
              label: "Add Task",
              type: "text",
              id: {id},
              name: {name},
              required: true,
            },
          ]}
        />
        {buttonCheck ? <StyledButton offColor small type="submit" style={{marginTop:"15px"}}>{title}</StyledButton> : null}
        
      </StyledForm>
            
        </>
    )
}

export default AddSingle
