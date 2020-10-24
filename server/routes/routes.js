const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig");
const { isLoggedIn } = require("../helpers/auth-helper");

const { getData, insertIntoColumn, addJsonb, editJsonB } = require("./functions.js");

//GET JOBS
router.get("/jobs", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  getData("jobs", "added_by", { userName }, res);
});

//GET JOB DETAIL
router.get("/jobs/job-detail/:jobId", async (req, res) => {
  const job_id = req.params.jobId;
  getData("jobs", "job_id", { job_id }, res);
});

//ADD JOB
router.post("/job-board/add-job", isLoggedIn, async (req, res) => {
  let { companyName, jobTitle, jobDescription, star } = req.body;
  let userName = req.session.loggedInUser.name;
  var date = new Date();
  var values = [
    companyName,
    jobTitle,
    jobDescription,
    userName,
    true,
    star,
    date,
  ];
  var data =
    "company_name, job_title, job_description, added_by, job_saved, star, date_added";
  insertIntoColumn("jobs", data, values, res);
});


//ADD CONTACT
router.post("/job-board/job-detail/add-contact", isLoggedIn, (req, res) => {
  let {
    contact_name,
    contact_title,
    contact_linkedin,
    contact_email,
    contact_phone,
    jobId,
    index,
  } = req.body;

  let randomId;
  function randomAlphaNumeric() {
    return (randomId = ("0000" + (Math.random() * (100000 - 101) + 101)) | 0);
  }
  randomAlphaNumeric();
  let data = `[{"job_id":"${randomId}","contact_name":"${contact_name}", "contact_title":"${contact_title}", "contact_linkedin":"${contact_linkedin}", "contact_email":"${contact_email}", "contact_phone":"${contact_phone}"}]`
  if (index === null) {
    addJsonb("jobs", "job_contacts", "job_id", data, jobId, res)
  }
});



//EDIT CONTACT
router.post("/job-board/job-detail/edit-contact", isLoggedIn, (req, res) => {
  let userName = req.session.loggedInUser.name;
  let { key, value, job_id } = req.body;

  editJsonB("jobs", "job_contacts", key, value, "job_id", job_id, userName, res)
});

//SET CONTACT SENT

router.post(
  "/job-board/job-detail/set-contact-sent",
  isLoggedIn,
  async (req, res) => {
    let userName = req.session.loggedInUser.name;

    let { checkKey, checkedState, job_id } = req.body;

    try {
      pool.query(
        `
          with ${checkKey} as (
            SELECT ('{'||index-1||',${checkKey}}')::text[] as path
              FROM jobs
                ,jsonb_array_elements(job_contacts) with ordinality arr(contact, index)
                WHERE contact->>'job_id' = '${job_id}'
                and added_by = '${userName}'
          )
          UPDATE jobs
            set job_contacts = jsonb_set(job_contacts, ${checkKey}.path, '"${checkedState}"')
            FROM ${checkKey}
            WHERE added_by = '${userName}'
            RETURNING *;
                   `,
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
  }
);

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
      `,
      [userName],

      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);
        res.status(200).json(results.rows);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//ADD JOB TASK

router.post("/job-board/job-detail/add-task", isLoggedIn, (req, res) => {
  let { content, jobId } = req.body;

  pool.query(
    `
          UPDATE jobs
          SET job_tasks = coalesce(job_tasks::jsonb,'{}'::jsonb) || '[{"content":"${content}", "completed":false}]' ::jsonb
          WHERE job_id = $1
          RETURNING *;
           `,
    [jobId],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows[0]);
    }
  );
});

//REMOVE JOB TASK
router.post("/job-board/job-detail/delete-task", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { index } = req.body;

  try {
    pool.query(
      `UPDATE jobs 
      SET job_tasks = job_tasks - ${index} 
      WHERE added_by=$1
      RETURNING *;
      `,
      [userName],

      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);
        res.status(200).json(results.todos);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//ADD JOB NOTES

router.post("/job-board/job-detail/add-notes", isLoggedIn, (req, res) => {
  let { jobNotes, jobId } = req.body;
  let userName = req.session.loggedInUser.name;
  console.log("in backend");
  pool.query(
    `
          UPDATE jobs
          SET job_notes = '${jobNotes}'
          WHERE job_id = $1
          RETURNING *;
           `,
    [jobId],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows[0]);
      res.status(200).json(results.rows[0]);
    }
  );
});

//SET JOB STATUS

router.post("/job-board/set-status", isLoggedIn, async (req, res) => {
  let { value, job_id } = req.body;
  let date = new Date();
  try {
    pool.query(
      `UPDATE jobs
    SET applied = $2,
     archived = $2,
     incontact = $2,
     interview1 = $2,
     interview2 = $2,
     interview3 = $2,
     denied = $2,
     job_saved = $2
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
    if (value === "applied") {
      pool.query(
        `UPDATE jobs
        SET date_applied = $2
        WHERE job_id = $1;
       `,
        [job_id, date],
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results);
          res.status(200).json(results.rows[0]);
        }
      );
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//SET STAR

router.post("/job-board/set-star", isLoggedIn, async (req, res) => {
  let { renderStar, job_id } = req.body;

  try {
    pool.query(
      `UPDATE jobs
      SET star = $2
      WHERE job_id = $1;
     `,
      [job_id, renderStar],
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

router.post("/job-board/delete-job", (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { job_id } = req.body;
  console.log(userName);
  try {
    pool.query(
      `DELETE FROM jobs
      WHERE job_id = $1 AND added_by = $2 
      RETURNING *;
    `,
      [job_id, userName],
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

module.exports = router;
