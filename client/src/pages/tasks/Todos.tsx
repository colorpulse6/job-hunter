import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../../config";
import { TaskContext } from "../../context/TaskContext";
import TaskNav from "./TaskNav"


import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const Todos = () => {
  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;
  const[dateCheck, setDateCheck] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [sendDate, setSendDate] = useState("")
  console.log(taskState)

 useEffect(()=>{
   if(dateCheck){
     console.log("SEND IT!")
     setSendDate(startDate.toISOString())
   }
 })
 

  const addTodo = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    console.log(content);
    
    axios
      .post(
        `${config.API_URL}/tasks/todos/add-todo`,
        {
          content,
          sendDate
        },
        { withCredentials: true }
      )
      .then((result) => {
        getTasks();
        Array.from(document.querySelectorAll("input")).forEach((input) => {
          input.value = "";
          if (input.type === "checkbox") {
            input.checked = false;
          }
        });
        
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const removeTodo = (index) => {
    console.log(index);
    axios
      .post(
        `${config.API_URL}/tasks/todos/delete-todo`,
        {
          index,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getTasks();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <TaskNav />
    
    <div onSubmit={(e) => addTodo(e)}>
      <form>
        <input
          type="text"
          id="content"
          name="content"
          placeholder="Content"
          required
        />
        <input type="submit" value="Add Todo" />
      </form>
      <div>
        <p>Select due date?
          <input type="checkbox" onChange={()=>{setDateCheck(!dateCheck)}}></input>
        </p>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
      </div>
      
      <div>
        <h3>Todo</h3>
        {taskState.todos
          ? taskState.todos.map((todo, index) => {
              return (
                <div key={index}>
                  <p>{todo.content}</p>
                  <button onClick={() => removeTodo(index)}>X</button>
                </div>
              );
            })
          : null}
      </div>
     
    </div>
    </div>
  );
};

export default Todos;
