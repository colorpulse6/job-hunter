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

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  password2: string;
}

interface IErrors {
  message: string;
}

interface Props {
  history: {
    push(url: string): void;
  };
}

export default function Signup(props: Props): JSX.Element {
  const authContext = useContext(AuthContext);
  const { setAuthState, setIsAuthenticated } = authContext;

  const [error, setErrors] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let target = e.currentTarget as any;
    var values: SignUpForm = {
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
      password2: target.password2.value,
    };
    const { name, email, password, password2 } = values;
    axios
      .post(
        `${config.API_URL}/users/signup`,
        {
          name,
          email,
          password,
          password2,
        },
        { withCredentials: true }
      )
      .then((res) => {
    
          setAuthState(res.data)
          setIsAuthenticated(true)          
        

        props.history.push("/home");
      })
      .catch((err) => {
        setErrors(err.response.data.error);
        console.log(err.response.data.error);
      });
  };

  return (
    <div>
      <StyledForm auth onSubmit={(e) => handleSubmit(e)}>
        <Form
          auth
          inputs={[
            {
              label: "Name",
              type: "text",
              id: "name",
              name: "name",
              required: true,
            },
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
            {
              label: "Confirm Password",
              type: "password",
              id: "password2",
              name: "password2",
              required: true,
            },
          ]}
          title="Sign Up"
          hasBackground
        ></Form>
      </StyledForm>

      {error ? <p>{error}</p> : null}
    </div>
  );
}
