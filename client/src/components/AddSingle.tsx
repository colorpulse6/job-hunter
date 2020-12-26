import React, { useState } from 'react'
import Form from "./Form";
import {
  StyledForm,
  StyledButton,
} from "../styles/styled-components/StyledElements";
import DatePicker from "react-datepicker";

const AddSingle = (props) => {
    let { handleAddFunction, title, id, name, addDate, setDateCheck, dateCheck, startDate, setStartDate } = props

    const [buttonVisible, setButton] = useState(false)


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
              type: "text",
              id: {id},
              name: {name},
              label: "Add Task",
              required: true,
            },
          ]}
        />
        {buttonVisible ? <StyledButton offColor small type="submit" style={{marginTop:"15px"}}>{title}</StyledButton> : null}

        {addDate ? <div>
              <p>
                Select due date?
                <input
                  type="checkbox"
                  onChange={() => {
                    setDateCheck(!dateCheck);
                  }}
                ></input>
              </p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div> : null}
        
      </StyledForm>
            
        </>
    )
}

export default AddSingle
