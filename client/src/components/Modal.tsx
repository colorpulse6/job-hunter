import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import AddJob from "../components/job-board/AddJob";
// include styles
import "rodal/lib/rodal.css";
import AddButtonImg from "../assets/add-button.png";

import { AddButton } from "../styles/styled-components/StylesMain";

const Modal = (props) => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (props.toggleOn) {
      hide();
    }
  }, [props.toggleOn]);

  console.log(props.toggleOn);

  return (
    <>
      {props.addJob ? (
        <button onClick={show}>{props.title}</button>
      ) : (
        <button style={{ border: "none" }} onClick={show}>
          <AddButton src={AddButtonImg} />
        </button>
      )}

      <Rodal visible={visible} onClose={hide}>
        <div>{props.content}</div>
      </Rodal>
    </>
  );
};

export default Modal;
