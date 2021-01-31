const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig");
const { isLoggedIn } = require("../helpers/auth-helper");

const {
  getData,
  insertIntoColumn,
  deleteFromTable,
  setRow,
  addToJsonBArray,
  addJsonb,
  editJsonB,
  editJsonBArray,
  removeFromJsonBArray,
  removeFromJsonB,
} = require("./functions.js");

//GET PREPERATION
router.get("/preperation", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  getData("preperation", "added_by", { userName }, res);
});

//ADD QUESTION
router.post(
  "/preperation/interview-questions/add-question",
  isLoggedIn,
  (req, res) => {
    let { question } = req.body;
    let userName = req.session.loggedInUser.name;
    let questionInsert = '[{"question":"${question}", "answer":null}]';
    let values = [userName, questionInsert];
    let data = "added_by, interview_questions";
    pool.query(
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }
        //Create preperation if doesnt exist
        if (!results.rows[0]) {
          insertIntoColumn("preperation", data, values, res);
        } else {
          //Add question to user question array
          addToJsonBArray(
            "preperation",
            "interview_questions",
            `'[{"question":"${question}", "answer":null }]'`,
            "added_by",
            userName,
            res
          );
        }
      }
    );
  }
);

//ADD ANSWER

router.post(
  "/preperation/interview-questions/add-answer",
  isLoggedIn,
  (req, res) => {
    let { answer, question, index } = req.body;
    let userName = req.session.loggedInUser.name;
    let data = `'{"answer":"${answer}", "question":"${question}"}'`;
    editJsonBArray(
      "preperation",
      "interview_questions",
      index,
      data,
      "TRUE",
      "added_by",
      userName,
      res
    );

    //REMOVE INTERVIEW QUESTION

    router.post(
      "/preperation/interview-questions/delete-question",
      (req, res) => {
        const userName = req.session.loggedInUser.name;
        const { index } = req.body;

        removeFromJsonB(
          "preperation",
          "interview_questions",
          index,
          "added_by",
          userName,
          res
        );
      }
    );
  }
);

//ADD HARD SKILL
router.post(
  "/preperation/hard-skills/add-hard-skill",
  isLoggedIn,
  (req, res) => {
    let { skill } = req.body;
    let userName = req.session.loggedInUser.name;
    let data = "added_by, hard_skills";
    let values = [userName, skill];
    pool.query(
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }

        //Create hard skill if doesnt exist

        if (!results.rows[0]) {
          insertIntoColumn("preperation", data, values, res);
        } else {
          //Add hard skill to user question array
          addToJsonBArray(
            "preperation",
            "hard_skills",
            `'{${skill}}'`,
            "added_by",
            userName,
            res
          );
        }
      }
    );
  }
);

//REMOVE HARD SKILL

router.post("/preperation/hard-skills/delete-hard-skill", async (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { skill } = req.body;
  removeFromJsonBArray(
    "preperation",
    "hard_skills",
    skill,
    "added_by",
    userName,
    res
  );
});

//ADD CAREER GOALS
router.post("/preperation/career-goals/add-goal", isLoggedIn, (req, res) => {
  let { goal } = req.body;
  let userName = req.session.loggedInUser.name;
  let data = "added_by, career_goals";
  let values = [userName, goal];

  pool.query(
    `SELECT * FROM preperation WHERE added_by = $1`,
    [userName],
    (err, results) => {
      if (err) {
        throw err;
      }

      //Create preperation if doesnt exist
      if (!results.rows[0]) {
        insertIntoColumn("preperation", data, values, res);
      } else {
        //Add goal
        addToJsonBArray(
          "preperation",
          "career_goals",
          `'{${goal}}'`,
          "added_by",
          userName,
          res
        );
      }
    }
  );
});

//REMOVE CAREER GOAL

router.post("/preperation/career-goals/delete-goal", (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { goal } = req.body;
  removeFromJsonBArray(
    "preperation",
    "career_goals",
    goal,
    "added_by",
    userName,
    res
  );
});

//ADD PITCH
router.post("/preperation/pitch/edit-pitch", isLoggedIn, (req, res) => {
  let { pitch } = req.body;
  let userName = req.session.loggedInUser.name;
  values = [userName, pitch];
  data = ["added_by, pitch"];
  pool.query(
    `SELECT * FROM preperation WHERE added_by = $1`,
    [userName],
    (err, results) => {
      if (err) {
        throw err;
      }

      //Create preperation if doesnt exist
      if (!results.rows[0]) {
        insertIntoColumn("preperation", data, values, res);
      } else {
        //Add pitch
        setRow("preperation", ["pitch"], pitch, "added_by", userName, res);
      }
    }
  );
});

//ADD SOFT SKILL
router.post(
  "/preperation/soft-skills/add-soft-skill",
  isLoggedIn,
  (req, res) => {
    let { skill } = req.body;
    let userName = req.session.loggedInUser.name;
    let data = "added_by, soft_skills";
    let values = [userName, skill];
    pool.query(
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }

        //Create soft skill if doesnt exist
        if (!results.rows[0]) {
          insertIntoColumn("preperation", data, values, res);
        } else {
          //Add soft skill to user question array
          addToJsonBArray(
            "preperation",
            "soft_skills",
            `'{${skill}}'`,
            "added_by",
            userName,
            res
          );
        }
      }
    );
  }
);

//REMOVE Soft SKILL

router.post("/preperation/soft-skills/delete-soft-skill", (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { skill } = req.body;
  removeFromJsonBArray(
    "preperation",
    "soft_skills",
    skill,
    "added_by",
    userName,
    res
  );
});

//ADD NOTE
router.post("/preperation/notes/add-notes", isLoggedIn, (req, res) => {
  let { notes } = req.body;
  let userName = req.session.loggedInUser.name;
  values = [userName, notes];
  data = ["added_by, preperation_notes"];
  pool.query(
    `SELECT * FROM preperation WHERE added_by = $1`,
    [userName],
    (err, results) => {
      if (err) {
        throw err;
      }

      //Create preperation if doesnt exist
      if (!results.rows[0]) {
        insertIntoColumn("preperation", data, values, res);
      } else {
        //Add pitch
        setRow(
          "preperation",
          ["preperation_notes"],
          notes,
          "added_by",
          userName,
          res
        );
      }
    }
  );
});

//REMOVE NOTE

router.post("/preperation/notes/delete-note", (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { note } = req.body;
  removeFromJsonBArray(
    "preperation",
    "preperation_notes",
    note,
    "added_by",
    userName,
    res
  );
});

//ADD Resume Category
router.post(
  "/preperation/resume-category/add-resume-category",
  isLoggedIn,
  (req, res) => {
    let { category } = req.body;
    let userName = req.session.loggedInUser.name;
    let data = `[{"category_name":"${category}"}]`;
    let values = [userName, data];
    pool.query(
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }

        //Create Resume Category if doesnt exist
        if (!results.rows[0]) {
          insertIntoColumn("preperation", data, values, res);
        } else {
          addJsonb(
            "preperation",
            "resume_category",
            "added_by",
            data,
            userName,
            res
          );
        }
      }
    );
  }
);

//REMOVE Resume Category

router.post(
  "/preperation/resume-category/delete-resume-category",
  (req, res) => {
    const userName = req.session.loggedInUser.name;
    const { index } = req.body;
    removeFromJsonB(
      "preperation",
      "resume_category",
      index,
      "added_by",
      userName,
      res
    );
  }
);

//ADD Resume Url
// router.post(
//   "/preperation/resume-category/add-resume-url",
//   isLoggedIn,
//   (req, res) => {
//     let { resumeUrl, resumeUploadUrl, resumeCategoryName, index } = req.body;

//     const userName = req.session.loggedInUser.name;

//     let data = `'{${index}}', '{"resume_url":"${resumeUrl}",
//                  , "category_name":"${resumeCategoryName}"}'`

//     editJsonBArray("preperation", "interview_questions", index, data, "TRUE", "added_by", userName, res)

//     // pool.query(
//     //   `
//     //     UPDATE preperation
//     //              SET resume_category = jsonb_set(resume_category,'{${index}}', '{"resume_url":"${resumeUrl}",
//     //              , "category_name":"${resumeCategoryName}"}', TRUE )
//     //              WHERE added_by = $1
//     //              RETURNING *;
//     //      `,
//     //   [userName],
//     //   (err, results) => {
//     //     if (err) {
//     //       throw err;
//     //     }
//     //     console.log(results.rows[0]);
//     //     res.status(200).json(results.rows[0]);
//     //   }
//     // );
//   }
// );

//ADD Resume Upload Url

router.post(
  "/preperation/resume-category/upload-resume",
  isLoggedIn,
  (req, res) => {
    let { resumeUploadUrl, resumeCategoryName, index } = req.body;
    const userName = req.session.loggedInUser.name;
    let data = `'{"category_name":"${resumeCategoryName}", "resume_upload_url":"${resumeUploadUrl}"}'`;

    editJsonBArray(
      "preperation",
      "resume_category",
      index,
      data,
      "TRUE",
      "added_by",
      userName,
      res
    );
  }
);

//REMOVE Resume Upload (FIX)

router.post("/preperation/resume-category/delete-resume-url", (req, res) => {
  const userName = req.session.loggedInUser.name;
  const { index, resumeCategoryName, resumeUploadUrl } = req.body;
  let data = `'{"category_name":"${resumeCategoryName}", "resume_upload_url":"${resumeUploadUrl}"}'`;

  editJsonBArray(
    "preperation",
    "resume_category",
    index,
    data,
    "TRUE",
    "added_by",
    userName,
    res
  );
});

//ADD Cover Letter Category
router.post(
  "/preperation/cover-letter-category/add-cover-letter-category",
  isLoggedIn,
  (req, res) => {
    let { category } = req.body;
    const userName = req.session.loggedInUser.name;
    let data = `[{"category_name":"${category}"}]`;
    let values = [userName, data];

    pool.query(
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }

        //Create COVER LETTER Category if doesnt exist
        if (!results.rows[0]) {
          insertIntoColumn("preperation", data, values, res);
        } else {
          addJsonb(
            "preperation",
            "cover_letter_category",
            "added_by",
            data,
            userName,
            res
          );
        }
      }
    );
  }
);

//REMOVE Cover Letter Category

router.post(
  "/preperation/cover-letter-category/delete-cover-letter-category",
  async (req, res) => {
    const userName = req.session.loggedInUser.name;
    const { index } = req.body;
    removeFromJsonB(
      "preperation",
      "cover_letter_category",
      index,
      "added_by",
      userName,
      res
    );
  }
);

//SAVE Cover Letter

router.post(
  "/preperation/cover-letter-category/save-cover-letter",
  isLoggedIn,
  (req, res) => {
    let { coverLetterContent, coverLetterCategoryName, index } = req.body;
    const userName = req.session.loggedInUser.name;

    pool.query(
      `
        UPDATE preperation
        SET cover_letter_category = jsonb_set(cover_letter_category,'{${index}}', '{"category_name":"${coverLetterCategoryName}", "content":"${coverLetterContent}"}', TRUE )
        WHERE added_by = $1
        RETURNING *;
           `,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows[0]);
        res.status(200).json(results.rows[0]);
      }
    );
  }
);

module.exports = router;
