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

module.exports = { pool };
