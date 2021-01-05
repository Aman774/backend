// var pg = require("pg");
// require("dotenv").config();

// //or native libpq bindings
// //var pg = require('pg').native

// var conString = process.env.DATABASE_URL; //Can be found in the Details page
// var client = new pg.Client(conString);
// client.connect(function(err) {
//   if (err) {
//     return console.error("could not connect to postgres", err);
//   }
//   client.query(
//     "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,email VARCHAR(100) UNIQUE NOT NULL,name VARCHAR(100) NOT NULL,password VARCHAR(100) NOT NULL,created_on DATE NOT NULL)",
//     function(err, result) {
//       if (err) {
//         return console.error("error running query", err);
//       }
//       console.log(result);
//       // >> output: 2018-08-23T14:02:57.117Z
//       client.end();
//     }
//   );
// });

const pool = require("./pool");

const createReflectionTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        reflections(
          id UUID PRIMARY KEY,
          success TEXT NOT NULL,
          low_point TEXT NOT NULL,
          take_away TEXT NOT NULL,
          owner_id UUID NOT NULL,
          created_date TIMESTAMP,
          modified_date TIMESTAMP,
          FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
        )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
        users(
          id UUID PRIMARY KEY,
          email VARCHAR(128) UNIQUE NOT NULL,
          password VARCHAR(128) NOT NULL,
          created_date TIMESTAMP,
          modified_date TIMESTAMP
        )`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Reflection Table
 */
const dropReflectionTable = () => {
  const queryText = "DROP TABLE IF EXISTS reflections returning *";
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};
/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = "DROP TABLE IF EXISTS users returning *";
  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};
/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createReflectionTable();
};
/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropReflectionTable();
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = {
  createReflectionTable,
  createUserTable,
  createAllTables,
  dropUserTable,
  dropReflectionTable,
  dropAllTables
};

require("make-runnable");
