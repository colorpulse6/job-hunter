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
          console.log(results.rows)
          res.status(200).json(results.rows[0]);
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  });

  //ADD QUESTION
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
  
  
        //Create preperation if doesnt exist
        if (!results.rows[0]) {
          pool.query(
            `
            INSERT INTO preperation (added_by, interview_questions)
            VALUES ($1, '[{"question":"${question}", "answer":null}]')
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
          //Add question to user question array
          pool.query(
            `
            UPDATE preperation
                 SET interview_questions = interview_questions || '[{"question":"${question}", "answer":null }]'
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

  //ADD ANSWER

  router.post("/preperation/interview-questions/add-answer", isLoggedIn, (req, res)=> {
    let { answer, question, index } = req.body;
    let userName = req.session.loggedInUser.name;
    pool.query(
        `
        UPDATE preperation
                 SET interview_questions = jsonb_set(interview_questions,'{${index}}', '{"answer":"${answer}", "question":"${question}"}', TRUE )
                 WHERE added_by = $1
                 RETURNING *;
         `, [userName],
        (err, results) => {
          if (err) {
            throw err;
          }
          res.status(200).json(results.rows[0].interview_questions);
        }
      );

      //REMOVE INTERVIEW QUESTION

      router.post("/preperation/interview-questions/delete-question", async (req, res) => {
        const userName = req.session.loggedInUser.name;
        const { index } = req.body;
      
        try {
          pool.query(
            `UPDATE preperation 
            SET interview_questions = interview_questions - ${index} 
            WHERE added_by=$1
            RETURNING *;
            `,[userName],
    
            
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results)
              res.status(200).json(results.preperation);
            }
          );
        } catch (err) {
          console.log(err.message);
          res.status(500).send("Server error");
        }
      });


  })

   //ADD HARD SKILL
router.post("/preperation/hard-skills/add-hard-skill", isLoggedIn, (req, res) => {
    let { skill } = req.body;
    let userName = req.session.loggedInUser.name;
  
    pool.query(
    
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }
  
  
        //Create hard skill if doesnt exist
        if (!results.rows[0]) {
          pool.query(
            `
            INSERT INTO preperation (added_by, hard_skills)
            VALUES ($1, '[${skill}]')
            RETURNING *;
               `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(result)
              res.status(200).json(results.rows[0]);
            }
          );
        } else {
          //Add question to user question array
          pool.query(
            `
            UPDATE preperation
                 SET hard_skills = hard_skills || '{${skill}}'
                 WHERE added_by = $1
                 RETURNING *;
             `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results)
              res.status(200).json(results.rows);
            }
          );
        }
      }
    );
  });

  //REMOVE HARD SKILL 

  router.post("/preperation/hard-skills/delete-hard-skill", async (req, res) => {
    const userName = req.session.loggedInUser.name;
    const { skill } = req.body;
  
    try {
      pool.query(
        `UPDATE preperation 
        SET hard_skills = array_remove(hard_skills, '${skill}')  
        WHERE added_by=$1
        RETURNING *;
        `,[userName],

        
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results)
          res.status(200).json(results.preperation);
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  });


  //ADD CAREER GOALS
router.post("/preperation/career-goals/add-goal", isLoggedIn, (req, res) => {
    let { goal } = req.body;
    let userName = req.session.loggedInUser.name;
  
    pool.query(
    
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }
  
  
        //Create preperation if doesnt exist
        if (!results.rows[0]) {
          pool.query(
            `
            INSERT INTO preperation (added_by, hard_skills)
            VALUES ($1, $2)
            RETURNING *;
               `,
            [userName, goal],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(result)
              res.status(200).json(results.rows[0]);
            }
          );
        } else {
            
          //Add goal 
          pool.query(
            `
            UPDATE preperation
                 SET career_goals = career_goals || '{${goal}}'
                 WHERE added_by = $1
                 RETURNING *;
             `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results)
              res.status(200).json(results.rows);
            }
          );
        }
      }
    );
  });

  

  //REMOVE CAREER GOAL

  router.post("/preperation/career-goals/delete-goal", async (req, res) => {
    const userName = req.session.loggedInUser.name;
    const { goal } = req.body;
  
    try {
      pool.query(
        `UPDATE preperation 
        SET career_goals = array_remove(career_goals, '${goal}')  
        WHERE added_by=$1
        RETURNING *;
        `,[userName],

        
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results)
          res.status(200).json(results.preperation);
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  });


  //ADD PITCH
router.post("/preperation/pitch/edit-pitch", isLoggedIn, (req, res) => {
    let { pitch } = req.body;
    let userName = req.session.loggedInUser.name;
  
    pool.query(
    
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }
  
  
        //Create preperation if doesnt exist
        if (!results.rows[0]) {
          pool.query(
            `
            INSERT INTO preperation (added_by, pitch)
            VALUES ($1, $2)
            RETURNING *;
               `,
            [userName, pitch],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(result)
              res.status(200).json(results.rows[0]);
            }
          );
        } else {
            
          //Add pitch 
          pool.query(
            `
            UPDATE preperation
                 SET pitch = '${pitch}'
                 WHERE added_by = $1
                 RETURNING *;
             `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results)
              res.status(200).json(results.rows);
            }
          );
        }
      }
    );
  });


     //ADD SOFT SKILL
router.post("/preperation/soft-skills/add-soft-skill", isLoggedIn, (req, res) => {
    let { skill } = req.body;
    let userName = req.session.loggedInUser.name;
  
    pool.query(
    
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }
  
  
        //Create soft skill if doesnt exist
        if (!results.rows[0]) {
          pool.query(
            `
            INSERT INTO preperation (added_by, soft_skills)
            VALUES ($1, '[${skill}]')
            RETURNING *;
               `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(result)
              res.status(200).json(results.rows[0]);
            }
          );
        } else {
          //Add soft skill to user question array
          pool.query(
            `
            UPDATE preperation
                 SET soft_skills = soft_skills || '{${skill}}'
                 WHERE added_by = $1
                 RETURNING *;
             `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results)
              res.status(200).json(results.rows);
            }
          );
        }
      }
    );
  });

  //REMOVE Soft SKILL 

  router.post("/preperation/soft-skills/delete-soft-skill", async (req, res) => {
    const userName = req.session.loggedInUser.name;
    const { skill } = req.body;
  
    try {
      pool.query(
        `UPDATE preperation 
        SET soft_skills = array_remove(soft_skills, '${skill}')  
        WHERE added_by=$1
        RETURNING *;
        `,[userName],

        
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results)
          res.status(200).json(results.preperation);
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  });


   //ADD NOTE
router.post("/preperation/notes/add-note", isLoggedIn, (req, res) => {
    let { note } = req.body;
    let userName = req.session.loggedInUser.name;
  
    pool.query(
    
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }
  
  
        //Create Preperation if doesnt exist
        if (!results.rows[0]) {
          pool.query(
            `
            INSERT INTO preperation (added_by, preperation_notes)
            VALUES ($1, $2)
            RETURNING *;
               `,
            [userName, note],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(result)
              res.status(200).json(results.rows);
            }
          );
        } else {
          //Add note to user question array
          pool.query(
            `
            UPDATE preperation
                 SET preperation_notes = preperation_notes || '{${note}}'
                 WHERE added_by = $1
                 RETURNING *;
             `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results)
              res.status(200).json(results.rows);
            }
          );
        }
      }
    );
  });

  //REMOVE NOTE

  router.post("/preperation/notes/delete-note", async (req, res) => {
    const userName = req.session.loggedInUser.name;
    const { note } = req.body;
  
    try {
      pool.query(
        `UPDATE preperation 
        SET preperation_notes = array_remove(preperation_notes, '${note}')  
        WHERE added_by=$1
        RETURNING *;
        `,[userName],

        
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results)
          res.status(200).json(results.preperation);
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  });


   //ADD Resume Category
router.post("/preperation/resume-category/add-resume-category", isLoggedIn, (req, res) => {
    let { category } = req.body;
    const userName = req.session.loggedInUser.name;

    pool.query(
    
      `SELECT * FROM preperation WHERE added_by = $1`,
      [userName],
      (err, results) => {
        if (err) {
          throw err;
        }
  
  
        //Create Resume Category if doesnt exist
        if (!results.rows[0]) {
          pool.query(
            `
                    INSERT INTO preperation (added_by, resume_category)
                    VALUES ($1, '[{"category_name":"${category}"}]')
                    RETURNING *;
               `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              res.status(200).json(results.rows[0]);
            }
          );
        } else {
          //Add resume category to user task array
          pool.query(
            `
            UPDATE preperation
                 SET resume_category = coalesce(resume_category::jsonb,'{}'::jsonb) || '[{"category_name":"${category}"}]' ::jsonb
                 WHERE added_by = $1
                 RETURNING *;
             `,
            [userName],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows[0])
              res.status(200).json(results.rows[0]);
            }
          );
        }
      }
    );
  });

    //REMOVE Resume Category

router.post("/preperation/resume-category/delete-resume-category", async (req, res) => {
    const userName = req.session.loggedInUser.name;
    const { index } = req.body;
  
    try {
      pool.query(
        `UPDATE preperation 
        SET resume_category = resume_category - ${index} 
        WHERE added_by=$1
        RETURNING *;
        `,[userName],

        
        (err, results) => {
          if (err) {
            throw err;
          }
          console.log(results.rows)
          res.status(200).json(results.rows[0]);
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  });


  module.exports = router;
