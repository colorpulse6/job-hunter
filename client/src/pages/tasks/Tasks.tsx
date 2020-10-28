import React, {useEffect} from "react";
import { Link, useHistory } from "react-router-dom";

export default function Tasks(): JSX.Element {
  // console.log(taskState.todos)
  const history = useHistory()
  useEffect(()=> {
history.push('/tasks/todos')
  })
  return (
    <div>
    {/* <div>
      <Link to={{ pathname: "/tasks/todos" }}>Todos</Link>
      <Link to="/tasks/challenges">Challenges</Link>
      <Link to="/tasks/learning">Learning</Link>
    </div> */}
    </div>
  );
}
