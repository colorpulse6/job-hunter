import React from "react";
import { CardContent } from "../../../styles/styled-components/StyledContainers";
import DatePicker from "react-datepicker";
import Form from "../../../components/Form"

const AddTodo = (props) => {
  const { setDateCheck, dateCheck, startDate, setStartDate, addTodo } = props;
  return (
    <>
      <form onSubmit={(e) => addTodo(e)}>
        <CardContent>
          <Form 
          auth
          smallText
          inputs={[
            {
             type:"text",
             id:"content",
             name:"content",
             label:"Content",
             required:true
            },
           ]}
          />

            <div>
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
            </div>
            {/* <input type="submit" value="Add Todo" /> */}
          
        </CardContent>
      </form>
    </>
  );
};

export default AddTodo;
