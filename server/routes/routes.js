const express = require("express");
const app = express();

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

  module.exports = app;
