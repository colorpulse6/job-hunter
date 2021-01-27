const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { pool } = require("../dbConfig");

const { isLoggedIn } = require("../helpers/auth-helper");
const { addJsonb, addToJsonBArray } = require("./functions.js");
router.post("/users/signup", async (req, res) => {
  let { name, email, password, password2 } = req.body;

  if (!name || !email || !password || !password2) {
    res.status(500).json({
      error: "Please enter all fields",
    });
  }

  if (password.length < 6) {
    res.status(500).json({
      error: "Password must be at least 6 characters",
    });
  }

  if (password !== password2) {
    res.status(500).json({
      error: "Passwords don't match",
    });
  }

  //PASSWORD TEST
  // const myPassRegex = new RegExp(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
  // );

  // if (!myPassRegex.test(password)) {
  //   res.status(500).json({
  //     error:
  //       "Password needs to have 8 characters, a number and an Uppercase alphabet",
  //   });
  // }

  //EMAIL TEST
  // const myRegex = new RegExp(
  //   /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  // );
  // if (!myRegex.test(email)) {
  //   res.status(500).json({
  //     error: "Email format not correct",
  //   });
  //   return;
  // }
  let hashedPassword = await bcrypt.hash(password, 10);
  // console.log(hashedPassword);

  pool.query(
    `SELECT * FROM users
        WHERE email = $1`,
    [email],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      // const user = results.rows[0];

      // console.log(results.rows);

      if (results.rows.length > 0) {
        res.status(500).json({
          error: "Email already Registered",
        });
      } else {
        //INSERT
        pool.query(
          `INSERT INTO users (name, email, password)
              VALUES ($1, $2, $3)
              RETURNING id, name, email,password
              `,
          [name, email, hashedPassword],
          (err, results) => {
            if (err) {
              throw err;
            }
            req.session.loggedInUser = results.rows[0];
            // req.session.save();
            // console.log(req.session.loggedInUser);
            res.status(200).json(user);
          }
        );
      }
    }
  );
});

//LOGIN

router.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userUltimate = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (userUltimate.rows.length > 0) {
      const user = userUltimate.rows[0];

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.log(err);
        }
        if (isMatch) {
          req.session.loggedInUser = user;
          req.session.save();
          // console.log(req.session);
          res.status(200).json(user);
        } else {
          //password is incorrect
          return res.status(401).json("Password or Email is Incorrect");
        }
      });
    } else {
      // No user
      return res.status(401).json("Password or Email is incorrect");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

//LOGOUT

router.post("/users/logout", isLoggedIn, (req, res) => {
  req.session.destroy();
  // console.log(req.session);
  res
    .status(204) 
    .send();
});

//GET USER

router.get("/user", isLoggedIn, async (req, res, next) => {
  try {
   
    await res.status(200).json(req.session.loggedInUser);
    // console.log(req.session.loggedInUser)
  } catch (err) {
    console.log(err.message);
  }
});

//EDIT PROFILE
router.post("/profile/edit-profile", isLoggedIn, (req, res) => {
  let id = req.session.loggedInUser.id
  let {key, value} = req.body
  console.log(key, value)
  
  pool.query(
    `UPDATE users SET ${key} = '${value}' WHERE id = ${id} RETURNING *`, 
    
    (err, results) => {
      if (err) {
        console.log('error!')
        throw err;
      }
      // console.log('success!')
      let editedUser = results.rows[0]
      req.session.loggedInUser = editedUser
      res.status(200).json(results.rows[0]);
    }
  );
});

// //EDIT PROFILE
// router.post("/profile/edit-goals", isLoggedIn, (req, res) => {
//   let id = req.session.loggedInUser.id
//   let {key, value, column} = req.body
//   // console.log(key)
//   console.log("column= "+ column, value, key)
//   pool.query(
//     ` 
//     UPDATE users 
//     SET ${column} = ${column} || '[{"${key}":"${value}"}]' :: jsonb
    
//     WHERE id = ${id} AND NOT '[{"${key}":"${value}"}]'::jsonb <@ ${column}
    
//     RETURNING *`, 
   
    
//     (err, results) => {
//       if (err) {
//         console.log('error!')
//         throw err;
//       }
//       // console.log('success!')
//       // let editedUser = results.rows[0]
//       // req.session.loggedInUser = editedUser
//       res.status(200).json(results.rows[0]);
//       console.log(results.rows[0])
//     }
//   );
// });

//Upload Profile Pic

router.post("/profile/edit-profile/upload-profile-pic", isLoggedIn, (req, res) => {
  let id = req.session.loggedInUser.id
  let {profilePicUrl} = req.body
  
  pool.query(
    `UPDATE users SET profile_pic_url = '${profilePicUrl}' WHERE id = ${id} RETURNING *`, 
    
    (err, results) => {
      if (err) {
        console.log('error!')
        throw err;
      }
      console.log('success!')
      let editedUser = results.rows[0]
      req.session.loggedInUser = editedUser
      console.log(results.rows[0])
      res.status(200).json(results.rows[0]);
    }
  );
});

//SET CALENDAR SETTINGS
router.post("/users/calendar-settings", isLoggedIn, (req, res) => {
  let id = req.session.loggedInUser.id
  let { seeAllEvents, see_other, see_deadlines, see_applied, see_added, weekendsVisible} = req.body;
  let data = `{"see_all":"${seeAllEvents}", "see_other":"${see_other}", "see_deadlines":"${see_deadlines}", "see_applied":"${see_applied}", "see_added":"${see_added}", "see_weekends":"${weekendsVisible}"}`;

  
      //Create task if doesnt exist
     
        pool.query(
          `
          UPDATE users
          SET calendar_settings = '${data}'
          WHERE id = $1
          RETURNING *;
               `,
          [id],
          (err, results) => {
            if (err) {
              throw err;
            }
            res.status(200).json(results.rows[0]);
          }
        );
});


module.exports = router;
