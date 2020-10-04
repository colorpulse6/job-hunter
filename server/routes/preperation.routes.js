const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig");
const { isLoggedIn } = require("../helpers/auth-helper");


//GET PREPERATION
router.get("/preperation", async (req, res) => {
    const userName = req.session.loggedInUser.name;
    try {
      pool.query(
        `SELECT * FROM preperation WHERE added_by = $1`,
        [userName],
        (err, results) => {
          if (err) {
            throw err;
          }
          res.status(200).json(results.rows[0]);
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  });

  //ADD PREPERATION
router.post("/preperation/interview-questions/add-question", isLoggedIn, (req, res) => {
    let { question } = req.body;
    let userName = req.session.loggedInUser.name;
  
    pool.query(
    
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }
  
  
        //Create task if doesnt exist
        if (!results.rows[0]) {
          pool.query(
            `
                    INSERT INTO preperation (added_by, interview_questions)
                    VALUES ($1, '[{"question":"${content}", "answer":"${answer}]" }')
                    RETURNING *;
               `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              res.status(200).json(results.rows[0].interview_questions);
            }
          );
        } else {
          //Add task to user task array
          pool.query(
            `
            UPDATE preperation
                 SET interview_questions = interview_questions || '[{"question":"${content}", "answer":"${answer}" }]'
                 WHERE added_by = $1
                 RETURNING *;
             `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              res.status(200).json(results.rows[0].interview_questions);
            }
          );
        }
      }
    );
  });

  module.exports = router;
