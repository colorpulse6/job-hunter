import React, { useState, useEffect } from "react";
import { initialData, jobIdCategories } from "./initialJobData";
import JobColumn from "./JobColumn";
import { DragDropContext } from "react-beautiful-dnd";

const JobBoardRender = (props) => {
  const [columnState, setColumnState] = useState(initialData);
  const [jobIdArrays, setJobIdArrays] = useState(jobIdCategories);
  const [jobIdsSet, setJobIdsSet] = useState(false);

  const setIdsInColumns = () => {
    for (let key in jobIdArrays) {
      for (let eachColumn in initialData.columns) {
        if (initialData.columns[eachColumn].category === key) {
          initialData.columns[eachColumn].jobIds = jobIdArrays[key].filter(
            (value, index) => jobIdArrays[key].indexOf(value) === index
          );
        }
      }
    }
  };

  const setJobIds = () => {
    props.jobs.map((job) => {
      for (let eachColumn in columnState.columns) {
        let column = columnState.columns[eachColumn];

        if (column.category === job.job_category) {
          let filteredArray = jobIdArrays[column.category].filter(
            (value, index) =>
              jobIdArrays[column.category].indexOf(value) === index
          );

          // console.log(jobIdArrays[column.category])
          setJobIdArrays((prevState) => ({
            ...prevState,
            [column.category]: [
              ...prevState[column.category],
              String(job.job_id),
            ],
          }));
        }
      }
    });
  };

  useEffect(() => {
    setJobIds();
    setIdsInColumns();
  }, [props.jobs]);

  useEffect(() => {
    setIdsInColumns();
  }, [jobIdArrays]);

  window.onload = () => {
    setJobIds();
    setIdsInColumns();
  };

  setIdsInColumns();

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
    // console.log(draggableId);
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
            addJob={props.addJob}
            jobs={jobs}
            toggleOn={props.toggleOn}
          />
        );
      })}
    </DragDropContext>
  );
};

export default JobBoardRender;
