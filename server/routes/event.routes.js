const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig");

const { isLoggedIn } = require("../helpers/auth-helper");

const { getData, insertIntoColumn, addJsonb } = require("./functions.js");

//GET EVENTS
router.get("/events", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  getData("events", "added_by", { userName }, res);
});

//ADD EVENT
router.post("/events/add-event", isLoggedIn, (req, res) => {
  let { title, date, start_time, end_time, allday } = req.body;
  let userName = req.session.loggedInUser.name;
  let values = [userName, title, start_time, end_time, allday, date];
  let data = "added_by, title, start_time, end_time, allday, date";

  pool.query(insertIntoColumn("events", data, values, res));
});




module.exports = router;
