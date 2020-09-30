import React from "react";
import axios from "axios";
import config from "../../config";
const Todos = (props) => {

  const todos = props.location.state.todos
  const { getTasks } = props.location.state
  console.log(props.location.state)
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

    const removeTodo = (content) => {
      axios
      .post(
        `${config.API_URL}/tasks/todos/delete-todo`,
        {
          content
        },
        { withCredentials: true }
      )
      .then(() => {
        getTasks();
        // console.log(job_id);
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
        {todos.map((todo, index)=>{
          return <div key={index}>
            <p>{todo.content}</p>
             <button onClick={() => removeTodo(todo.content)}>X</button>
            </div>
        })}
       
      </div>
    </div>
  );
};

export default Todos
