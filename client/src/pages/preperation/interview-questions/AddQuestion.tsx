import React from 'react'
import {StyledInput} from "../../../styles/styled-components/StylesMain"


const AddQuestion = ({ addQuestion }) => {
    return (
        <>
         <form onSubmit={(e) => addQuestion(e)}>
          <StyledInput
            fontMedium
            type="text"
            id="question"
            name="question"
            placeholder="Please Enter a Question"
            required
          />
          <input type="submit" value="Add Question" />
        </form>
            
        </>
    )
}

export default AddQuestion
