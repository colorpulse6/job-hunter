const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig");
const { isLoggedIn } = require("../helpers/auth-helper");

const {
  getData,
  insertIntoColumn,
  deleteFromTable,
  setRow,
  addJsonb,
  editJsonB,
  removeFromJsonB
} = require("./functions.js");

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
  let data = `[{"job_id":"${randomId}","contact_name":"${contact_name}", "contact_title":"${contact_title}", "contact_linkedin":"${contact_linkedin}", "contact_email":"${contact_email}", "contact_phone":"${contact_phone}"}]`;
  if (index === null) {
    addJsonb("jobs", "job_contacts", "job_id", data, jobId, res);
  }
});

//EDIT CONTACT
router.post("/job-board/job-detail/edit-contact", isLoggedIn, (req, res) => {
  let userName = req.session.loggedInUser.name;
  let { key, value, job_id } = req.body;

  editJsonB(
    "jobs",
    "job_contacts",
    key,
    value,
    "job_id",
    job_id,
    userName,
    res
  );
});

//SET CONTACT SENT

router.post(
  "/job-board/job-detail/set-contact-sent",
  isLoggedIn,
  (req, res) => {
    let userName = req.session.loggedInUser.name;

    let { checkKey, checkedState, job_id } = req.body;
    editJsonB(
      "jobs",
      "job_contacts",
      checkKey,
      checkedState,
      "job_id",
      job_id,
      userName,
      res
    );
  }
);

//REMOVE CONTACT

router.post("/job-board/job-detail/delete-contact",  (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { index } = req.body;

  removeFromJsonB("jobs", "job_contacts", userName, index, res) 
});

//ADD JOB TASK

router.post("/job-board/job-detail/add-task", isLoggedIn, (req, res) => {
  let { content, jobId } = req.body;
  let data = `[{"content":"${content}", "completed":false}]`

  addJsonb("jobs", "job_tasks", "job_id", data, jobId, res);

  
});

//REMOVE JOB TASK
router.post("/job-board/job-detail/delete-task", (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { index } = req.body;

  removeFromJsonB("jobs", "job_tasks", userName, index, res) 

});


//ADD JOB NOTES

router.post("/job-board/job-detail/add-notes", isLoggedIn, (req, res) => {
  let { jobNotes, jobId } = req.body;
  console.log("in backend");
  setRow("jobs", ["job_notes"], jobNotes, "job_id", jobId, res)
});


//SET JOB STATUS

router.post("/job-board/set-status", isLoggedIn, async (req, res) => {
  let { value, job_id } = req.body;
  let date = new Date();
  let rows = ["applied",
    "archived",
    "incontact",
    "interview1",
    "interview2",
    "interview3",
    "denied",
    "job_saved"]
    // setRow("jobs", [...rows], null, "job_id", job_id, res)

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
        setRow("jobs", ["star"], renderStar, "job_id", job_id, res)

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

const removeFromTable = (column, param, id, userName, res) => {
  pool.query(
    `DELETE FROM ${column}
    WHERE ${param} = $1 AND added_by = $2 
    RETURNING *;
  `,
    [id, userName],
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
    deleteFromTable("jobs", "job_id", job_id, userName, res)
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
