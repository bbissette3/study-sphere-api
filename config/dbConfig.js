// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "postgres",
//   database: "postgres",
//   password: "postgres",
//   port: 5432,
//   host: "studysphere.cqo2scb9bxyw.us-east-2.rds.amazonaws.com",
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 20000,
//   min: 0,
// });

// // pool.connect((err) => {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log("Connection");
// //   }
// // });

// module.exports = { pool };

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
  min: 0,
});

// pool.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Connection");
//   }
// });

module.exports = { pool };
