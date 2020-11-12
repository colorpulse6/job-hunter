const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig");

const { isLoggedIn } = require("../helpers/auth-helper");

const { insertIntoColumn } = require("./functions.js");

//ADD Event
router.post("/events/add-event", isLoggedIn, (req, res) => {
  let { title, date, start_time, end_time, allday } = req.body;
  let userName = req.session.loggedInUser.name;
  let values = [userName,title, date, start_time, end_time, allday];
  let data = "added_by, title, date, start_time, end_time, allday";
  
  pool.query(insertIntoColumn("events", data, values, res));
});

module.exports = router;
