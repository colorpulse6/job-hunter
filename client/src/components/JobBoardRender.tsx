import React, { useState, useEffect } from "react";
// import { initialData } from "./initialJobData";
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

export const initialData = {
  columns: {
    'column-1': {
      id: "column-1",
      title: "Saved",
      category: "job_saved",
      jobIds:[]
    },
    'column-2': {
      id: "column-2",
      title: "Applied",
      category: "applied",
      jobIds:[]

    },
    'column-3': {
      id: "column-3",
      title: "In Contact",
      category: "incontact",
      jobIds:[]

    },
    'column-4': {
      id: "column-4",
      title: "Interview 1",
      category: "interview_1",
      jobIds:[]

    },
    'column-5': {
      id: "column-5",
      title: "Interview 2",
      category: "interview_2",
      jobIds:[]

    },
    'column-6': {
      id: "column-6",
      title: "Interview 3",
      category: "interview_3",
      jobIds:[]

    },
    'column-7': {
      id: "column-7",
      title: "Hired",
      category: "hired",
      jobIds:[]

    },
    'column-8': {
      id: "column-8",
      title: "Denied",
      category: "denied",
      jobIds:[]

    },
    'column-9': {
      id: "column-9",
      title: "Archived",
      category: "archived",
      jobIds:[]
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5", "column-6", "column-7", "column-8", "column-9"],
};

const JobBoardRender = (props) => {
  const [columnState, setColumnState] = useState(initialData);
  const [jobCategories, setJobCategories] = useState([])

  useEffect(() => {
    props.jobs.forEach(job => setJobCategories(prevArray => [...prevArray, job.id] ));
    
    // let columns = Object.values(initialData.columns)  
    // let matchingIds = []
    props.jobs.map((job)=>{
      for (let cat in initialData.columns){
        if(initialData.columns[cat].category == job.job_category){
          // const newColumn = {
          //   ...columnState.columns[columnState.columns[cat].id],
          //   jobIds: [...columnState.columns[columnState.columns[cat].id].jobIds, String(job.job_id)],
          // } 
          // const newInitialState = {
          //   ...columnState,
          //   columns: {
          //     ...columnState.columns,
          //     [newColumn.id]: newColumn,
          //   },
          // };
          // setColumnState(newInitialState);
          // let columnIds = columnState.columns[cat].id
          // matchingIds.push(columnIds)
          // console.log(newInitialState)
          // initialData.columns[cat].jobIds = []
          let columnJobIds = initialData.columns[cat].jobIds
          columnJobIds.push(job.job_id)
          columnJobIds.filter((elem, index, self) =>
             index === self.indexOf(elem)
        )
        
        } 
        
       

        // console.log(job.job_category)
        // console.log(initialData.columns[cat].category)
      }
      
    })
    // matchingIds.map((id)=>{
      
    //   const newColumn = {
    //     ...columnState.columns[id],
    //     jobIds: id,
    //   };
    //     console.log(newColumn)
      
    // })
    
  }, [props.jobs]);
    // console.log(columnState)



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

    const start = columnState.columns[source.droppableId];
    const finish = columnState.columns[destination.droppableId];

    if (start === finish) {
      const newJobIds = Array.from(start.jobIds);
      newJobIds.splice(source.index, 1);
      newJobIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        jobIds: newJobIds,
      };

      const newState = {
        ...columnState,
        columns: {
          ...columnState.columns,
          [newColumn.id]: newColumn,
        },
      };
      setColumnState(newState);
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
      ...columnState,
      columns: {
        ...columnState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    props.changeStatus(finish.category, draggableId);
    setColumnState(newMoveState);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {columnState.columnOrder.map((columnId) => {
        const column = columnState.columns[columnId];
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
