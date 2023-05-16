const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  db: "study-sphere-db",
  password: "postgres",
  port: 5432,
  host: "localhost",
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
  min: 0,
});

module.exports = { pool };
