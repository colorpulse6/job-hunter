import React from 'react'
import {
    PageContainer,
    CardContainer,
    CardContent
  } from "../../../styles/styled-components/StyledContainers";
  import DatePicker from "react-datepicker";

const AddLearning = (props) => {
    const { addLearning, setDateCheck, dateCheck, startDate, setStartDate } = props
    return (
        <>
        <div onSubmit={(e) => addLearning(e)}>
      <CardContainer short>
        <CardContent>
        <form>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
          <input
            type="text"
            id="tutorialUrl"
            name="tutorialUrl"
            placeholder="Url"
            required
          />

          
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
        </form>
      </CardContent>
      </CardContainer>
      </div>
            
        </>
    )
}

export default AddLearning
