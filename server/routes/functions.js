const express = require("express");
const router = express.Router();
const { pool } = require("../dbConfig");

//FETCH GENERAL DATA
const getData = (column, param, selector, res) => {
  console.log(selector);
  //GET VARIABLE NAME FOR DYNAMIC RENDER OF RESULTS
  var name = Object.keys(selector)[0];
  var value = selector[name];
  try {
    pool.query(
      `SELECT * FROM ${column} WHERE ${param} = $1`,
      [value],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);
        if (name === "job_id") {
          res.status(200).json(results.rows[0]);
        }
        if (name === "userName") {
          res.status(200).json(results.rows);
        }
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

//INSERT INTO COLUMN
const insertIntoColumn = (column, data, values, res) => {
  try {
    pool.query(
      `INSERT INTO ${column} (${data})
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
      [...values],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows[0]);
        res.status(200).json(results.rows[0]);
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

const addJsonb = (column, row, param, data, jobId, res) => {

  pool.query(
    `
        UPDATE ${column}
         SET ${row} = coalesce(${row}::jsonb,'{}'::jsonb) || '${data}' ::jsonb
        WHERE ${param} = $1
        RETURNING *;
                 `,
    [jobId],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);
      res.status(200).json(results.rows);
    }
  );
}

const editJsonB = (column, row, key, value, param, job_id, userName, res ) => {
  pool.query(
    `
          with ${key} as (
            SELECT ('{'||index-1||',${key}}')::text[] as path
              FROM ${column}
                ,jsonb_array_elements(${row}) with ordinality arr(contact, index)
                WHERE contact->>'${param}' = '${job_id}'
                and added_by = $1
          )
          UPDATE ${column}
            set ${row} = jsonb_set(${row}, ${key}.path, '"${value}"')
            FROM ${key}
            WHERE added_by = $1
            RETURNING *;
                   `,
                   [userName],

    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);
      res.status(200).json(results.rows[0]);
    }
  );

}

module.exports = { getData, insertIntoColumn, addJsonb, editJsonB };
