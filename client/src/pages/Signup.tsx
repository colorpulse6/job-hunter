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
      .then((result) => {
        if (result) {
          authContext.setAuthState(result.data);
        }

        props.history.push("/home");
      })
      .catch((err) => {
        setErrors(err.response.data.error);
        console.log(err.response.data.error);
      });
  };

  return (
    <div>
      {/* <StyledForm auth onSubmit={(e) => handleSubmit(e)}>
        <div>
          <StyledInput fontMedium
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
        </div>
        <div>
          <StyledInput fontMedium
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <StyledInput fontMedium
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <StyledInput fontMedium
            type="password"
            id="password2"
            name="password2"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className={"auth-submit"}>
        <div>
          <StyledSubmit type="submit" value="Sign Up" />
        </div>
          
          <a href="/login">Already have an account?</a>
        
        </div>
      </StyledForm> */}
      <StyledForm auth onSubmit={(e) => handleSubmit(e)}>
        <Form
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
