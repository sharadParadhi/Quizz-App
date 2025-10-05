// const { Pool } = require('pg');
// require('dotenv').config();

// console.log(process.env.DB_HOST, process.env.DB_PASS);

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// pool
//   .connect()
//   .then(() => console.log('connected to postgres'))
//   .catch((err) => console.error('DB connection failed', err));

// module.exports = pool;

const { Pool } = require('pg');
require('dotenv').config();

console.log(process.env.DB_HOST, process.env.DB_PASS);

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // 👈 required for Render external DB
  },
});

pool
  .connect()
  .then(() => console.log('✅ Connected to Postgres'))
  .catch((err) => console.error('❌ DB connection failed', err));

module.exports = pool;
