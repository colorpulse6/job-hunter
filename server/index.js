const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./auth");
const { pool } = require("./dbConfig");

const PORT = process.env.PORT || 5000;

//Middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json());
app.set("view engine");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("Hello");
});

app.get("/users/signup", (req, res) => {
  res.render("signup");
});

app.get("/users/login", (req, res) => {
  res.render("login");
});

app.get("/users/landing", (req, res) => {
  res.render("landing");
});

app.post("/users/signup", (req, res) => {
  let { name, email, password, password2 } = req.body;
  console.log(name, email, password, password2);

  let errors = [];

  if (!name || !email || !password || !password2){
      errors.push({ message:"Please enter all fields" })
      
  }

  if(password.length < 6) {
    errors.push({ message:"Password must be at least 6 characters" })
  }

  if(password !== password2) {
    errors.push({ message:"Passwords don't match" })
  }

  if(errors.length > 0) {
    res.status(500).json({
        error: errors,
      });
      return
  } 

});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT})`);
});

//Postgres sever - 5001
