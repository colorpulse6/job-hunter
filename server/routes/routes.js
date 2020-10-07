const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig");
const { isLoggedIn } = require("../helpers/auth-helper");


//GET JOBS
router.get("/jobs", async (req, res) => {
  const user = req.session.loggedInUser;
  try {
    pool.query(
      `SELECT * FROM jobs WHERE added_by = $1`,
      [user.name],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//ADD JOB
router.post("/job-board/add-job", isLoggedIn, (req, res) => {
  let { companyName, jobTitle, jobDescription } = req.body;
  let userName = req.session.loggedInUser.name;
  pool.query(
    `INSERT INTO jobs (company_name, job_title, job_description, added_by)
        VALUES ($1, $2, $3, $4)
        RETURNING company_name, job_title, job_description, added_by
        `,
    [companyName, jobTitle, jobDescription, userName],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows[0]);
      res.status(200).json(results.rows[0]);
    }
  );
});

const removeFromTable = (database, id, user, res) => {
  pool.query(
    `DELETE FROM ${database }
    WHERE ${id} = $1 AND added_by = $2 
    RETURNING *;
  `,
    [(id), user],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    }
  );
}

//Remove Job

router.post("/job-board/delete-job", async (req, res) => {
  const user = req.session.loggedInUser;
  const { job_id } = req.body

  try {
    removeFromTable('jobs', job_id, user.name, res)
    
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;
