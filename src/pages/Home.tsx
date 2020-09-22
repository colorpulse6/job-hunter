import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

interface LoggedInUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export default function Home(): JSX.Element {
  const [user, getUser] = useState<LoggedInUser>({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    axios
      .get(`${config.API_URL}/user`, { withCredentials: true })
      .then((res) => {
        console.log('result:  ' + res.data);
        getUser(res.data);
      })
      .catch((err)=> {
          console.log(err)
      })
  });

  return (
    <div>
      Home Page
      {user.name}
    </div>
  );
}
