import React from "react";
import { CardContent } from "../../../styles/styled-components/StyledContainers";
import DatePicker from "react-datepicker";

const AddTodo = (props) => {
  const { setDateCheck, dateCheck, startDate, setStartDate, addTodo } = props;
  return (
    <>
      <div onSubmit={(e) => addTodo(e)}>
        <CardContent>
          <form>
            <input
              type="text"
              id="content"
              name="content"
              placeholder="Content"
              required
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
            <input type="submit" value="Add Todo" />
          </form>
        </CardContent>
      </div>
    </>
  );
};

export default AddTodo;
