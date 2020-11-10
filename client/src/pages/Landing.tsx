import React, { useState } from "react";
import { Link } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

import {
  Card,
  CardContent,
  CardFooter,
  CardItem,
} from "../styles/styled-components/StylesCard";
import {
  PageContainer,
  HeaderMain,
} from "../styles/styled-components/StylesMain";

import { Logo } from "../styles/styled-components/StylesNavbar";
import LogoImg from "../assets/bullseye-logo.png";
import { IProps } from "../interfaces";

export default function Landing(props: IProps): JSX.Element {
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);

  
  return (
    <PageContainer column center textCenter landing>
      <Logo landing src={LogoImg}></Logo>
      <HeaderMain>Get Hired</HeaderMain>{" "}
      <CardContent flex around jobCategory center>
        <button
          onClick={() => {
            setSignUp(!signUp);
            setLogin(false);
          }}
        >
          Sign Up
        </button>

        <button
          onClick={() => {
            setLogin(!login);
            setSignUp(false);
          }}
        >
          Login
        </button>
      </CardContent>
      {signUp ? <Signup history={props.history} /> : null}
      {login ? <Login history={props.history} /> : null}
    </PageContainer>
  );
}
