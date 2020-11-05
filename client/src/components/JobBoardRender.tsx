import React, { useState, useEffect } from "react";
import { initialData } from "./initialJobData";
import JobColumn from "./JobColumn";
import { DragDropContext } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  JobCard,
  JobHeader,
  CardFooter,
  JobTitle,
} from "../styles/styled-components/StylesCard";

const JobBoardRender = (props) => {
  const [state, setState] = useState(initialData);
  // console.log(state)
  // const [jobIds, setJobIds]=useState([])

  useEffect(() => {
    let newColumns = []
    
    let columnId
    let jobIds = []
    let jobId 
    props.jobs.map((job) => {
      let columns = Object.values(initialData.columns);
      // let matching = columns.filter((column) => {
      //   return column.category === job.job_category;
      // });
      columns.map((column)=>{
        if(column.category === job.job_category){
         
          columnId = column.id
          jobId = job.job_id
          // jobIds = [...jobIds, job.job_id]
        }
      })
    });
    let newColumn = {
      ...state.columns[columnId],
      jobIds:[...jobIds, jobId]
    }
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn,
      },
    };
    setState(newState)
    console.log(state)
    // console.log(newColumns)
    // console.log(jobIds)

    // console.log(props.jobs)
      // const initialState = {
      //   ...state,
      //   columns: {
      //       ...state.columns,
      //       [column.jobIds]: [...jobIds]
      //   }
    // };

      // console.log(initialData.columns)
  }, [props]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newJobIds = Array.from(start.jobIds);
      newJobIds.splice(source.index, 1);
      newJobIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        jobIds: newJobIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    //MOVING BETWEEN COLUMNS
    const startJobIds = Array.from(start.jobIds);
    startJobIds.splice(source.index, 1);

    const newStart = {
      ...start,
      jobIds: startJobIds,
    };

    const finishJobIds = Array.from(finish.jobIds);
    finishJobIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      jobIds: finishJobIds,
    };

    const newMoveState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    props.changeStatus(finish.category, draggableId);
    setState(newMoveState);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {state.columnOrder.map((columnId) => {
        const column = state.columns[columnId];
        const jobs = column.jobIds.flatMap((jobId) =>
          props.jobs.filter((job) => job.job_id == jobId)
        );
        return (
          <JobColumn
            key={column.id}
            column={column}
            handleStar={props.handleStar}
            removeJob={props.removeJob}
            jobs={jobs}
          />
        );
      })}
    </DragDropContext>
  );
};

export default JobBoardRender;
