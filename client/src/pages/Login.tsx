import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../config";
import { AuthContext } from '../context/AuthContext'


import {
  StyledForm,
  StyledSubmit,
  StyledInput,

} from "../styles/styled-components/StyledElements";
import {
  CardContent,
  
} from "../styles/styled-components/StylesCard";
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
  const authContext = useContext(AuthContext)

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
      .post(`${config.API_URL}/users/login`, {
        email,
        password,
      }, {withCredentials:true})
      .then((res) => {
        authContext.setAuthState(res.data)
        authContext.setIsAuthenticated(true)
        props.history.push("/home")
      })
      .catch((err) => {
        setErrors(err.response.data.error);
        console.log(err);
      });
  };
  return (
    <div>
      <StyledForm auth onSubmit={(e) => handleSubmit(e)}>
      
        <div>
          <StyledInput fontMedium
            type="email"
            id="email"
            name="email"
            autoFocus={true}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <StyledInput fontMedium
            type="password"
            id="password"
            name="password"
            autoFocus={true}
            placeholder="Password"
            required
          />
        </div>
    <div className={"auth-submit"}>
        <div >
          <StyledSubmit type="submit" value="Login" />

        </div>
        <a href="/signup">Signup?</a>
        </div>
      </StyledForm>{" "}
      {error ? <p>{error}</p>: null}
    </div>
  );
}

export default Login