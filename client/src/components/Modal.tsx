import React, { useState, useEffect } from "react";
import Rodal from "rodal";

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
        <button style={{ border: "none" }} onClick={show}><AddButton addJob src={AddButtonImg} /></button>
      ) : (
        <button style={{ border: "none" }} onClick={show}>
          <AddButton src={AddButtonImg} />
        </button>
      )}

      <Rodal visible={visible} onClose={hide} height={400} width={450}>
        <div>{props.content}</div>
      </Rodal>
    </>
  );
};

export default Modal;
