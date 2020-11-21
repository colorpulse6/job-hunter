import React, { useState } from "react";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

import { CardContent } from "../styles/styled-components/StylesCard";
import { HeaderMain } from "../styles/styled-components/StylesMain";

import { PageContainer } from "../styles/styled-components/StyledContainers";

import { StyledButton } from "../styles/styled-components/StyledElements";

import { Logo } from "../styles/styled-components/StylesNavbar";
import LogoImg from "../assets/bullseye-logo.png";
import { IProps } from "../interfaces";

export default function Landing(props: IProps): JSX.Element {
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);

  return (
    <PageContainer column center textCenter>
      {signUp || login ? null : (
        <>
          {" "}
          <Logo landing src={LogoImg} /> <HeaderMain>Get Hired</HeaderMain>
        </>
      )}
      {signUp || login ? (
        <>
          {" "}
          <Logo
            landing
            src={LogoImg}
            style={{ width: "75px", height: "75px" }}
          />{" "}
          <HeaderMain style={{ fontSize: "17px" }}>Get Hired</HeaderMain>
        </>
      ) : null}

      <CardContent flex around jobCategory center>
        <StyledButton
          active={signUp}
          onClick={() => {
            setSignUp(!signUp);
            setLogin(false);
          }}
        >
          Sign Up
        </StyledButton>

        <StyledButton
          active={login}
          onClick={() => {
            setLogin(!login);
            setSignUp(false);
          }}
        >
          Login
        </StyledButton>
      </CardContent>
      {signUp ? <Signup history={props.history} /> : null}
      {login ? <Login history={props.history} /> : null}
    </PageContainer>
  );
}
