import React, { useState, useEffect } from "react";
import Rodal from "rodal";

import "rodal/lib/rodal.css";
import AddButtonImg from "../assets/add-button.png";
import {
  AddButton,
  StyledButton,
} from "../styles/styled-components/StylesMain";
import {
  Card,
  CardContent,
  DropContainer,
  JobCard,
  JobHeader,
  CardFooter,
  JobTitle,
  CountCircle,
} from "../styles/styled-components/StylesCard";
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

  // console.log(props.toggleOn);

  return (
    <>
      {props.addJobPlus ? (
        <button style={{ border: "none" }} onClick={show}>
          <AddButton addJob src={AddButtonImg} />
        </button>
      ) : props.addJobColumn ? (
        <StyledButton fullWidth onClick={show}>
          Add Job
        </StyledButton>
      ) : props.jobDetail ? (
        <div role="button" onClick={show} style={{cursor:"pointer"}}><JobTitle mediumFont>
        <strong>{props.job.company_name}</strong>
      </JobTitle>

      <JobTitle title mediumFont>
        {props.job.job_title}
      </JobTitle></div>
      ):(
        <button style={{ border: "none" }} onClick={show}>
          <AddButton src={AddButtonImg} />
        </button>
      )}

      <Rodal
        visible={visible}
        onClose={hide}
        height={props.jobDetail ? 700 : 400}
        width={props.jobDetail ? 700 : 400}
        customStyles={{
          overflowY: "auto",
          boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
        }}
      >
        <div>{props.content}</div>
      </Rodal>
    </>
  );
};

export default Modal;
