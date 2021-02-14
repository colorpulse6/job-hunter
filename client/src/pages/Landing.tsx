import React, { useState, useEffect, useContext } from "react";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { AuthContext } from "../context/AuthContext";

import { HugeTitle } from "../styles/styled-components/StyledText";

import {
  PageContainer,
  Flex,
} from "../styles/styled-components/StyledContainers";

import {
  StyledButton,
  AuthButton,
} from "../styles/styled-components/StyledElements";

import { Logo } from "../styles/styled-components/StyledAssets";
import LogoImg from "../assets/bullseye-logo.png";
import { IProps } from "../interfaces";
import ToastIcon from "../assets/toaster.png";
import { Redirect } from "react-router";
import Loader from "../components/Loader";

export default function Landing(props: IProps): JSX.Element {
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuth(true);
    }
  }, [isAuthenticated]);

  if (!isAuth) {
    props.history.push("/home");
  }
  return (
    <PageContainer column center textCenter>
      <Flex center>
        <AuthButton
          active={signUp}
          onClick={() => {
            setSignUp(!signUp);
            setLogin(false);
          }}
        >
          Sign Up
        </AuthButton>

        <AuthButton
          active={login}
          onClick={() => {
            setLogin(!login);
            setSignUp(false);
          }}
        >
          Login
        </AuthButton>
      </Flex>
      {signUp ? <Signup history={props.history} /> : null}
      {login ? <Login history={props.history} /> : null}

      <div style={{ position: "absolute", left: "20%", top: "20%" }}>
        <HugeTitle>JOB TOAST</HugeTitle>
        <Logo dashboard src={ToastIcon} style={{ marginTop: "-40px" }} />
      </div>
    </PageContainer>
  );
}
