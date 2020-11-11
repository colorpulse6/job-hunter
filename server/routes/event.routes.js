const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig");

const { isLoggedIn } = require("../helpers/auth-helper");

const { insertIntoColumn } = require("./functions.js");

//ADD Event
router.post("/events/add-event", isLoggedIn, (req, res) => {
  let { added_by, title, start_time, end_time, allday } = req.body;
  let userName = req.session.loggedInUser.name;
  let data = `[{"added_by":"${added_by}", "title":${title}, "start_time":${start_time}, "end_time":${end_time}, "allday":${allday}}]`;
  let values = [userName, skill];
  pool.query(insertIntoColumn("events", data, values, res));
});

module.exports = router;
