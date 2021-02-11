const express = require("express");
const router = express.Router();
var Meta = require("html-metadata-parser");
const { pool } = require("../dbConfig");
const { isLoggedIn } = require("../helpers/auth-helper");
const {
  getData,
  insertIntoColumn,
  deleteFromTable,
  setRow,
  addJsonb,
  editJsonB,
  editJsonBArray,
  removeFromJsonB,
} = require("./functions.js");

//GET TASKS

router.get("/tasks", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  getData("tasks", "added_by", { userName }, res);
  
});

//ADD TODO
router.post("/tasks/todos/add-todo", isLoggedIn, (req, res) => {
  let { content, sendDate } = req.body;
  let userName = req.session.loggedInUser.name;
  let todoData = `[{"content":"${content}", "completed":false, "due_date":"${sendDate}"}]`;

  let data = "added_by, todos";
  let values = [userName, todoData];

  pool.query(
    `SELECT * FROM tasks WHERE added_by = $1`,
    [userName],
    (err, results) => {
      if (err) {
        throw err;
      }

      //Create task if doesnt exist
      if (!results.rows[0]) {
        insertIntoColumn("tasks", data, values, res);
      } else {
        //Add task to user task array
        addJsonb("tasks", "todos", "added_by", todoData, userName, res);
      }
    }
  );
});

//FINISH TODO

router.post("/tasks/todos/finish-todo", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { index, content, due_date, data } = req.body;

  editJsonBArray(
    "tasks",
    "todos",
    index,
    `'{"content":"${content}","due_data":"${due_date}","completed":${data}}'`,
    "TRUE",
    "added_by",
    userName,
    res
  );
});

//EDIT TODO DATE
router.post("/tasks/todos/edit-todo-date", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { index, content, due_date, data } = req.body;

  editJsonBArray(
    "tasks",
    "todos",
    index,
    `'{"content":"${content}","due_date":"${due_date}","completed":${data}}'`,
    "TRUE",
    "added_by",
    userName,
    res
  );
});

//REMOVE TODO

router.post("/tasks/todos/delete-todo", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { index } = req.body;

  try {
    pool.query(
      `UPDATE tasks 
        SET todos = todos - ${index} 
        WHERE added_by=$1
        RETURNING *;
        `,
      [userName],

      (err, results) => {
        if (err) {
          throw err;
        }
        // console.log(results.rows);
        res.status(200).json(results.todos);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//ADD CHALLENGE
router.post("/tasks/challenges/add-challenge", isLoggedIn, (req, res) => {
  let { name, url, repo, job_id, sendDate } = req.body;
  let userName = req.session.loggedInUser.name;
  let date = new Date();
  let challengeData = `[{"name":"${name}", "url":"${url}", "repo":"${repo}", "completed":false, "job_ref":"${job_id}", "dateAdded":"${date}", "due_date":"${sendDate}"}]`;
  let values = [userName, challengeData];
  let data = "added_by, challenges";

  pool.query(
    `SELECT * FROM tasks WHERE added_by = $1`,
    [userName],
    (err, results) => {
      if (err) {
        throw err;
      }

      //Create task if doesnt exist
      if (!results.rows[0]) {
        insertIntoColumn("tasks", data, values, res);
      } else {
        //Add challenge to user task array
        addJsonb(
          "tasks",
          "challenges",
          "added_by",
          challengeData,
          userName,
          res
        );
      }
    }
  );
});

//EDIT CHALLENGE

router.post("/tasks/challenges/edit-challenge", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { name, url, repo, job_id, sendDate, index } = req.body;

  editJsonBArray(
    "tasks",
    "challenges",
    index,
    `'{"name":"${name}","url":"${url}","repo":"${repo}","job_ref":"${job_id}", "due_date":"${sendDate}"}'`,
    "TRUE",
    "added_by",
    userName,
    res
  );
});

//REMOVE CHALLENGE

router.post("/tasks/challenges/delete-challenge", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { index } = req.body;

  try {
    pool.query(
      `UPDATE tasks 
        SET challenges = challenges - ${index} 
        WHERE added_by=$1
        RETURNING *;
        `,
      [userName],

      (err, results) => {
        if (err) {
          throw err;
        }
        // console.log(results.rows);
        res.status(200).json(results.challenges);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//ADD LEARNING
router.post("/tasks/learning/add-learning", isLoggedIn, (req, res) => {
  let { name, tutorialUrl, sendDate } = req.body;
  let userName = req.session.loggedInUser.name;
  let date = new Date();

  let data = "added_by, learning";
  let imageUrl;
  //Source Metadata from link

  (async () => {
    try {
      if(tutorialUrl.includes("http")){
        var result = await Meta.parser(tutorialUrl);
        if(result.images[0]){
          imageUrl = result.images[0].url
        } else if (result.og.images[0].url){
          imageUrl = result.og.images[0].url;
        } 
      } else {
        imageUrl = "https://newintrigue.files.wordpress.com/2018/04/learningforlife1.png?w=1024"
      }
      

      console.log(result);
      
    
      let learningData = `[{"name":"${name}", "tutorial_url":"${tutorialUrl}","image_url":"${imageUrl}", "dateAdded":"${date}",  "completed":false, "due_date":"${sendDate}"}]`;
      let values = [userName, learningData];

      pool.query(
        `SELECT * FROM tasks WHERE added_by = $1`,
        [userName],
        (err, results) => {
          if (err) {
            throw err;
          }

          //Create task if doesnt exist
          if (!results.rows[0]) {
            insertIntoColumn("tasks", data, values, res);
          } else {
            //Add learning to user task array
            addJsonb(
              "tasks",
              "learning",
              "added_by",
              learningData,
              userName,
              res
            );
          }
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  })();
});

//REMOVE Learning

router.post("/tasks/learning/delete-learning", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { index } = req.body;

  try {
    pool.query(
      `UPDATE tasks 
        SET learning = learning - ${index} 
        WHERE added_by=$1
        RETURNING *;
        `,
      [userName],

      (err, results) => {
        if (err) {
          throw err;
        }
        // console.log(results.rows);
        res.status(200).json(results.learning);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
