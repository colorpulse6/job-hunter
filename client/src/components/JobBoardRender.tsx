import React, {useState, useEffect} from "react";
import { initialData } from "./initialJobData";
import JobColumn from './JobColumn';
import { DragDropContext } from 'react-beautiful-dnd'
import {
  Card,
  CardContent,
  JobCard,
  JobHeader,
  CardFooter,
  JobTitle,
} from "../styles/styled-components/StylesCard";

const JobBoardRender = (props) => {
    const [state, setState] = useState(initialData)

    const [jobIds, setJobIds]=useState([])

    useEffect(()=>{
        let idArray = []
        props.jobs.map((job)=>{
            idArray.push(String(job.job_id)) 
               })
               setJobIds(idArray)

        console.log(props.jobs)
    }, [props])

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if(!destination){
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = initialData.columns[source.droppableId];
        const finish = initialData.columns[destination.droppableId];

        if(start === finish){
            const newJobIds = Array.from(jobIds);
            newJobIds.splice(source.index, 1);
            newJobIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                jobIds: newJobIds
            }
    
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn
                }
            }
            setState(newState)
            console.log(jobIds)
        }

        //MOVING FROM ONE LIST TO ANOTHER
        const startTaskIds = Array.from(start.jobIds)
        
    }
  return (
    <DragDropContext
    
    onDragEnd={onDragEnd}
    >
      {initialData.columnOrder.map((columnId) => {
          const column = initialData.columns[columnId]
        return (
            
          <JobColumn key={column.id} column={column} handleStar={props.handleStar} removeJob={props.removeJob}/>
            
          
        );
      })}
    </DragDropContext>
  );
};

export default JobBoardRender;
