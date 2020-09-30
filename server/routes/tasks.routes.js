const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig");
const { isLoggedIn } = require("../helpers/auth-helper");

//ADD TODO
router.post("/tasks/todos/add-todo", isLoggedIn, (req, res) => {
  let { content } = req.body;
  let userName = req.session.loggedInUser.name;

  pool.query(
  
    `SELECT * FROM tasks WHERE added_by = $1`,
    [userName],
    (err, results) => {
      if (err) {
        throw err;
      }
      //Create task if doesnt exist
      if (!results.rows[0]) {
        pool.query(
          `
                  INSERT INTO tasks (added_by, todos)
                  VALUES ($1, '[{"content":"${content}", "completed":false }]')
                  RETURNING *;
             `,
          [userName],
          (err, results) => {
            if (err) {
              throw err;
            }
            res.status(200).json(results.rows[0].todos);
          }
        );
      } else {
        //Add task to user task array
        pool.query(
          `
          UPDATE tasks
               SET todos = todos || '{"content":"${content}", "completed":false}'
               WHERE added_by = $1
               RETURNING *;
           `,
          [userName],
          (err, results) => {
            if (err) {
              throw err;
            }
            res.status(200).json(results.rows[0].todos);
          }
        );
      }
    }
  );
});


//Remove Task

router.post("/tasks/todos/delete-todo", async (req, res) => {
    const user = req.session.loggedInUser;
    const { content } = req.body
  
    try {
      pool.query(
        `UPDATE tasks 
        SET todos = array_remove(todos, '{"content":"${content}", "completed":false}')`
        ,
        [user.name, content],
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results.rows[0])
          res.status(200).json(results.rows);
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  });
  


//GET TASKS
router.get("/tasks", async (req, res) => {
    const userName = req.session.loggedInUser.name;
    try {
      pool.query(
        `SELECT * FROM tasks WHERE added_by = $1`,
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

module.exports = router;
