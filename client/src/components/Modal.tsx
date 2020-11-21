import React, { useState, useEffect } from "react";
import Rodal from "rodal";

import "rodal/lib/rodal.css";
import AddButtonImg from "../assets/add-button.png";
import { AddButton } from "../styles/styled-components/StylesMain";

import { StyledButton } from "../styles/styled-components/StyledElements";

import { JobTitle } from "../styles/styled-components/StylesCard";
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
      {/* Add Job Button */}
      {props.addJobPlus ? (
        <button style={{ border: "none" }} onClick={show}>
          <AddButton addJob src={AddButtonImg} />
        </button>
      ) : //Job Column Button
      props.addJobColumn ? (
        <StyledButton fullWidth onClick={show}>
          Add Job
        </StyledButton>
      ) : //Job Detail Text
      props.jobDetail ? (
        <div role="button" onClick={show} style={{ cursor: "pointer" }}>
          <JobTitle smallFont>
            <strong>{props.job.company_name}</strong>
          </JobTitle>

          <JobTitle title smallFont>
            {props.job.job_title}
          </JobTitle>
        </div>
      ) : (
        //Basic Cross Button
        <button style={{ border: "none" }} onClick={show}>
          <AddButton src={AddButtonImg} />
        </button>
      )}

      <Rodal
        visible={visible}
        onClose={hide}
        height={props.jobDetail ? 700 : 400}
        width={props.jobDetail ? 850 : 400}
        customStyles={{
          overflowY: "auto",
          boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
          padding: props.jobDetail ? "0" : "",
          borderRadius: props.jobDetail ? "15px" : "",
        }}
      >
        <div>{props.content}</div>
      </Rodal>
    </>
  );
};

export default Modal;
