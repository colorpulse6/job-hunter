import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import { Link } from "react-router-dom";

import "rodal/lib/rodal.css";
import AddButtonImg from "../assets/add-button.png";
import {
  AddButton,
  StyledButton,
} from "../styles/styled-components/StylesMain";
import {
  Card,
  CardContent,
  JobCard,
  JobHeader,
  CardFooter,
  JobTitle,
  CountCircle,
  CardItem,
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
        <div>
          <button
            onClick={() => {
              show();
              // window.history.pushState("", "", `/job-board/${props.jobId}`);
            }}
          >
            {/* <Link to={`/job-board/${props.job.job_id}`}> */}

            <JobTitle mediumFont>
              <strong>{props.job.company_name}</strong>
            </JobTitle>
            {/* </Link> */}
            <JobTitle title mediumFont>
              {props.job.job_title}
            </JobTitle>
          </button>
        </div>
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
