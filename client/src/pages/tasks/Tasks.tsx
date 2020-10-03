import React, {useContext} from 'react'
import { Link } from "react-router-dom"
import { TaskContext } from "../../context/TaskContext";

export default function Tasks():JSX.Element  {

    const taskContext = useContext(TaskContext);
    const { taskState, getTasks } = taskContext;
    // console.log(taskState.todos)
    return (
        <div>
            Tasks Page
            <Link to={{pathname:"/tasks/todos"}}>Todos</Link>
            <Link to="/tasks/challenges">Challenges</Link>
            <Link to="/tasks/learning">Learning</Link>

            
            
        </div>
    )
}
