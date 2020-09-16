const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const { pool } = require("../dbConfig");

app.post("/users/signup", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  if (!name || !email || !password || !password2) {
    res.status(500).json({
      error: "Please enter all fields",
    });
  }

  if (password.length < 6) {
    res.status(500).json({
      error: "Password must be at least 6 characters",
    });
  }

  if (password !== password2) {
    res.status(500).json({
      error: "Passwords don't match",
    });
  }

  //PASSWORD TEST
  // const myPassRegex = new RegExp(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  // );

  // if (!myPassRegex.test(password)) {
  //   res.status(500).json({
  //     error:
  //       "Password needs to have 8 characters, a number and an Uppercase alphabet",
  //   });
  // }

  //EMAIL TEST
  // const myRegex = new RegExp(
  //   /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  // );
  // if (!myRegex.test(email)) {
  //   res.status(500).json({
  //     error: "Email format not correct",
  //   });
  //   return;
  // }
  let hashedPasword = await bcrypt.hash(password, 10);
  console.log(hashedPasword);

  pool.query(
    `SELECT * FROM users
        WHERE email = $1`,
    [email],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
    }
  );
});

module.exports = app;
