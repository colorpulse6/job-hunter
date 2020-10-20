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

//GET JOB DETAIL
router.get("/jobs/job-detail/:jobId", async (req, res) => {
  const job_id = req.params.jobId;
  console.log(job_id);
  try {
    pool.query(
      `SELECT * FROM jobs WHERE job_id = $1
      `,
      [job_id],
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

//ADD JOB
router.post("/job-board/add-job", isLoggedIn, (req, res) => {
  let { companyName, jobTitle, jobDescription } = req.body;
  let userName = req.session.loggedInUser.name;
  pool.query(
    `INSERT INTO jobs (company_name, job_title, job_description, added_by, job_saved)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING company_name, job_title, job_description, added_by, job_saved
        `,
    [companyName, jobTitle, jobDescription, userName, true],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows[0]);
      res.status(200).json(results.rows[0]);
    }
  );
});

//ADD CONTACT
router.post("/job-board/job-detail/add-contact", isLoggedIn, (req, res) => {

  let {contact_name,
    contact_title,
    contact_linkedin,
    contact_email,
    contact_phone, 
    jobId, 
    index} = req.body
  console.log(index)
  let randomId 
  function randomAlphaNumeric () {
    return randomId = ('0000'+(Math.random() * (100000 - 101) + 101)|0);
  };
randomAlphaNumeric()
  if (index === null){
  
        pool.query(
          `
          UPDATE jobs
          SET job_contacts = coalesce(job_contacts::jsonb,'{}'::jsonb) || '[{"job_id":"${randomId}","contact_name":"${contact_name}", "contact_title":"${contact_title}", "contact_linkedin":"${contact_linkedin}", "contact_email":"${contact_email}", "contact_phone":"${contact_phone}"}]' ::jsonb
          WHERE job_id = $1
          RETURNING *;
                   `,
          [jobId],
          (err, results) => {
            if (err) {
              throw err;
            }
            console.log(results.rows)
            // res.status(200).json(results.rows[0]);
          }
        );
  }
  
})

//EDIT CONTACT
router.post("/job-board/job-detail/edit-contact", isLoggedIn, (req, res) => {
  let userName = req.session.loggedInUser.name;

  let {key, value, job_id, index} = req.body
  console.log(index)
  
  
        pool.query(
          `
          with ${key} as (
            SELECT ('{'||index-1||',${key}}')::text[] as path
              FROM jobs
                ,jsonb_array_elements(job_contacts) with ordinality arr(contact, index)
                WHERE contact->>'job_id' = '${job_id}'
                and added_by = '${userName}'
          )
          UPDATE jobs
            set job_contacts = jsonb_set(job_contacts, ${key}.path, '"${value}"')
            FROM ${key}
            WHERE added_by = '${userName}'
            RETURNING *;
                   `,
          
          (err, results) => {
            if (err) {
              throw err;
            }
            console.log(results.rows)
            // res.status(200).json(results.rows[0]);
          }
        );
  
  
})

//REMOVE CONTACT

router.post("/job-board/job-detail/delete-contact", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { index } = req.body;

  try {
    pool.query(
      `UPDATE jobs 
      SET job_contacts = job_contacts - ${index} 
      WHERE added_by=$1
      RETURNING *;
      `,[userName],

      
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows)
        res.status(200).json(results.challenges);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/job-board/set-status", isLoggedIn, async (req, res) => {
  let { value, job_id } = req.body;
  try {
    pool.query(
      `UPDATE jobs
    SET applied = $2,
     archived = $2,
     incontact = $2,
     interview1 = $2,
     interview2 = $2,
     interview3 = $2,
     denied = $2
    WHERE job_id = $1
   `,
      [job_id, null],
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

  try {
    pool.query(
      `UPDATE jobs
      SET ${value} = $2
      WHERE job_id = $1;
     `,
      [job_id, true],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results);
        res.status(200).json(results.rows[0]);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

const removeFromTable = (database, id, user, res) => {
  pool.query(
    `DELETE FROM ${database}
    WHERE ${id} = $1 AND added_by = $2 
    RETURNING *;
  `,
    [id, user],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows);
    }
  );
};

//Remove Job

router.post("/job-board/delete-job", async (req, res) => {
  const user = req.session.loggedInUser;
  const { job_id } = req.body;

  try {
    removeFromTable("jobs", job_id, user.name, res);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
