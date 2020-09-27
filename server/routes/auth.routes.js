const express = require("express");
const app = express();
const router = express.Router();
const bcrypt = require("bcrypt");
const { pool } = require("../dbConfig");

const { isLoggedIn } = require("../helpers/auth-helper");

router.post("/users/signup", async (req, res) => {
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
  let hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  pool.query(
    `SELECT * FROM users
        WHERE email = $1`,
    [email],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      const user = results.rows[0];

      console.log(results.rows);

      if (results.rows.length > 0) {
        res.status(500).json({
          error: "Email already Registered",
        });
      } else {
        //INSERT
        pool.query(
          `INSERT INTO users (name, email, password)
              VALUES ($1, $2, $3)
              RETURNING id, name, email,password
              `,
          [name, email, hashedPassword],
          (err, results) => {
            if (err) {
              throw err;
            }
            req.session.loggedInUser = results.rows[0]
            req.session.save();
            console.log(req.session.loggedInUser);
            res.status(200).json(user);
          }
        );
      }
    }
  );
});

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userUltimate = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (userUltimate.rows.length > 0) {
      const user = userUltimate.rows[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.log(err);
        }
        if (isMatch) {
          req.session.loggedInUser = user;
          req.session.save();
          console.log(req.session);
          res.status(200).json(user);
        } else {
          //password is incorrect
          return res.status(401).json("Password or Email is Incorrect");
        }
      });
    } else {
      // No user
      return res.status(401).json("Password or Email is incorrect");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/users/logout", isLoggedIn,  (req, res) => {
 
     req.session.destroy();
    console.log(req.session)
    res
      .status(204) //  No Content
      .send();
 
});

router.get("/user", isLoggedIn, async (req, res, next) => {
  try {
    const { id, name, email } = req.session.loggedInUser
    const user = {
      id,
      name,
      email
    }
    await res.status(200).json(user);
    console.log(user);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
