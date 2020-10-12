import React from "react";
import { Link } from "react-router-dom";

export default function Tasks(): JSX.Element {
  // console.log(taskState.todos)
  return (
    <div>
      Tasks Page
      <Link to={{ pathname: "/tasks/todos" }}>Todos</Link>
      <Link to="/tasks/challenges">Challenges</Link>
      <Link to="/tasks/learning">Learning</Link>
    </div>
  );
}
