import React, { useState } from "react";
import axios from "axios";
import config from "../config";

interface LoginForm {
  email: string;
  password: string;
}

interface Props {
  history: {
      push(url: string): void;
  };
}



export default function Login(props:Props): JSX.Element {
  const [error, setErrors] = useState<string>("");

  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let target = e.currentTarget as any;

    var values: LoginForm = {
      email: target.email.value,
      password: target.password.value,
    };
    // console.log(values);
    const { email, password } = values;
    axios
      .post(`${config.API_URL}/users/login`, {
        email,
        password,
      })
      .then((result) => {
        console.log('this is result: ' + result.data)
        props.history.push("/home")
      })
      .catch((err) => {
        setErrors(err.response.data.error);
        console.log(err.response.data.error);
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
        <a href="/signup">Signup?</a>
      </form>{" "}
      {error ? <p>{error}</p>: null}
    </div>
  );
}
