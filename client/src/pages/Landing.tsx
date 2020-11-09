import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
} from "../styles/styled-components/StylesCard";
import {
  PageContainer,
  HeaderMain,
} from "../styles/styled-components/StylesMain";

export default function Landing(): JSX.Element {
  return (
    <PageContainer column even textCenter>
      <HeaderMain>Welcome to Job Hunter!</HeaderMain>{" "}
      <CardContent>
        <Link to="/signup">
          <button>Sign Up!</button>
        </Link>
      </CardContent>
      <CardContent>
        <Link to="/login">
          <button>Login</button>{" "}
        </Link>
      </CardContent>
    </PageContainer>
  );
}
