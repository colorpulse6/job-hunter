import React, { useState, useEffect } from "react";
import Rodal from "rodal";

import "../../node_modules/rodal/lib/rodal.css";
import AddButtonImg from "../assets/add-button.png";
import { AddButton } from "../styles/styled-components/StylesMain";
import { Card } from "../styles/styled-components/StyledContainers";
import { HeaderSecondary } from "../styles/styled-components/StyledText";
import { StyledButton } from "../styles/styled-components/StyledElements";
import Form from "../components/Form"
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
          <AddButton bottomRight src={AddButtonImg} />
        </button>
      ) : //Job Column Button
      props.addJobColumn ? (
        <StyledButton fullWidth onClick={show}>
          Add Job
        </StyledButton>
      ) : //Job Detail Text
      props.jobDetail ? (
        <div role="button" onClick={!props.challenge ? show : null} style={{ cursor: "pointer" }}>
          <HeaderSecondary smallFont>
            <strong>{props.job.company_name}</strong>
          </HeaderSecondary>

          <HeaderSecondary smallFont>
            {props.job.job_title}
          </HeaderSecondary>
        </div>
      ) :
      props.jobChallenge ? (
        <>
        <div onClick={show} style={{zIndex:99,border: "none", background:"none", position:"relative", right:"420px", top:"175px", margin:"0", width:"0"}}>
          <Form
        onChange={props.onChange}
        noSubmit
        smallText
        challenge
        putButton
        inputs = {[{
          label: "Challenge",
          type: "text",
          id: props.job_id,
          name: "challenge",
          required: false,
          value: props.challenge ? props.challenge: null,
        },]}
        />
        </div>
        {props.challenge ?<button onClick={(e)=>props.removeEdits(e, "challenge", props.job_id)} style={{ position: "fixed", right: "67px", top: "462px" }} >x</button> : null }
        
        </>
      ): (
        //Basic Cross Button
        <button style={{ border: "none" }} onClick={show}>
          <AddButton bottomRight src={AddButtonImg} />
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
