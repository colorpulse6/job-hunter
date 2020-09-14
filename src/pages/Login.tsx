import React from "react";

export default function Login(): JSX.Element {
  return (
    <div>
      <h1>Login</h1>
      <form action="/users/login" method="POST">
        <div>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div>
          <input
            type="text"
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
    </div>
  );
}
