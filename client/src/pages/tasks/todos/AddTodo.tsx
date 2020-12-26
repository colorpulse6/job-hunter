import React from "react";
import { CardContent } from "../../../styles/styled-components/StyledContainers";
import DatePicker from "react-datepicker";
import Form from "../../../components/Form"
import AddSingle from "../../../components/AddSingle"

const AddTodo = (props) => {
  const { setDateCheck, dateCheck, startDate, setStartDate, addTodo } = props;
  return (
    <>
     
      
         <AddSingle 
      handleAddFunction={addTodo} title={"Add Todo"} id="content" name="content" addDate setDateCheck={setDateCheck} dateCheck={dateCheck} startDate={startDate} setStartDate={setStartDate} label="Add Todo"
      />
          
  

      
    </>
  );
};

export default AddTodo;
