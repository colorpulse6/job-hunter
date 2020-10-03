import React, {useContext, useEffect} from "react";
import axios from "axios";
import config from "../../config";
import { TaskContext } from "../../context/TaskContext";

const Todos = (props) => {
  const taskContext = useContext(TaskContext);
  const { taskState, getTasks } = taskContext;
console.log(taskState.todos)
  // const todos = props.location.state.todos
  // const { getTasks } = props.location.state
  // console.log(props.location.state)
    const addTodo = (e) => {
      
      
        e.preventDefault();
        // let target = e.currentTarget as any;
       const content = e.target.content.value
    console.log(content)
      
        axios
          .post(
            `${config.API_URL}/tasks/todos/add-todo`,
            {
              content
            },
            { withCredentials: true }
          )
          .then((result) => {
            
            console.log(result.data);
          })
          .catch((err) => {
            console.log(err.response.data.error);
          });
    }

    const removeTodo = (index) => {
      console.log(index)
      axios
      .post(
        `${config.API_URL}/tasks/todos/delete-todo`,
        {
          index
        },
        { withCredentials: true }
      )
      .then((result) => {
        getTasks();
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
    }

  return (
    <div onSubmit={(e)=>addTodo(e)}>
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
        <h3>Todo</h3>
        {taskState.todos ? taskState.todos.map((todo, index)=>{
          return <div key={index}>
            <p>{todo.content}</p>
             <button onClick={() => removeTodo(index)}>X</button>
            </div>
        }) : null}
       
      </div>
    </div>
  );
};

export default Todos
