import React from "react";
import { CardContainer } from "../styles/styled-components/StyledContainers";
import Logo from "../assets/bullseye-logo.jpg";

const DragAndDrop = (props) => {
  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
  return (
    <>
      <CardContainer
        id="div1"
        onDrop={(event) => drop(event)}
        onDragOver={(event) => allowDrop(event)}
      ></CardContainer>

      <img
        id="drag1"
        src={Logo}
        draggable="true"
        onDragStart={drag}
        width="336"
        height="69"
      ></img>
      <CardContainer
        id="div1"
        onDrop={(event) => drop(event)}
        onDragOver={(event) => allowDrop(event)}
      ></CardContainer>
    </>
  );
};
export default DragAndDrop;
