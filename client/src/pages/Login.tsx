import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../config";
import { AuthContext } from "../context/AuthContext";

import Form from "../components/Form";

import {
  StyledForm,
  StyledSubmit,
  StyledInput,
} from "../styles/styled-components/StyledElements";
import { CardContent } from "../styles/styled-components/StylesCard";
interface LoginForm {
  email: string;
  password: string;
}

interface Props {
  history: {
    push(url: string): void;
  };
}

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

const Login: React.FC<Props> = (props): JSX.Element => {
  const authContext = useContext(AuthContext);
  const { setAuthState, setIsAuthenticated } = authContext;
  const [error, setErrors] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let target = e.currentTarget as any;

    var values: LoginForm = {
      email: target.email.value,
      password: target.password.value,
    };

    const { email, password } = values;
    axios
      .post(
        `${config.API_URL}/users/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setAuthState(res.data);
        setIsAuthenticated(true);
        props.history.push("/home");
      })
      .catch((err) => {
        setErrors(err.response.data.error);
        console.log(err);
      });
  };
  return (
    <div>
      <StyledForm auth onSubmit={(e) => handleSubmit(e)}>
        <Form
          auth
          inputs={[
            {
              label: "Email",
              type: "email",
              id: "email",
              name: "email",
              required: true,
            },
            {
              label: "Password",
              type: "password",
              id: "password",
              name: "password",
              required: true,
            },
          ]}
          title="Login"
          hasBackground
        ></Form>
      </StyledForm>{" "}
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default Login;
