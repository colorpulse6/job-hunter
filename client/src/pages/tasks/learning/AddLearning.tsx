import React from 'react'
import {
    PageContainer,
    CardContainer,
    CardContent
  } from "../../../styles/styled-components/StyledContainers";
  import DatePicker from "react-datepicker";
  import Form from "../../../components/Form";

const AddLearning = (props) => {
    const { addLearning, setDateCheck, dateCheck, startDate, setStartDate } = props
    return (
        <>
        <form onSubmit={(e) => addLearning(e)}>
      <CardContainer short>
        <CardContent>
        <h3>Add Learning</h3>
        <Form
            auth
            smallText
            inputs={[{
              type:"text",
            id:"name",
            name:"name",
            label:"Name",
            required:true
            }, {
              type:"text",
              id:"tutorialUrl",
              name:"tutorialUrl",
              label:"Url",
              required:true
            }]}>
        
          
        <div>
        <p>
          Select Deadline?
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
        
      </div>
      <input type="submit" value="Add Learning" />
        </Form>
      </CardContent>
      </CardContainer>
      </form>
            
        </>
    )
}

export default AddLearning
