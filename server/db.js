require("dotenv").config();
// import postgres from "postgres";
var pgp = require("pgp");
const { Pool, Client } = require("pg");

// const pool = new Pool()

// const connection = postgres(
//   "postgres://username:password@host:port/database",
//   {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//   }
// );

// const credentials = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.PORT || 3000,
// };

// const connection = pgp(credentials); //database instance

// const client = new Client({
//   host: process.env.DB_HOST,
//   port: process.env.PORT || 3000,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// EXAMPLE OF POOL
// host: 'localhost',
// user: 'database-user',
// max: 20, //defaults to 10
// idleTimeoutMillis: 30000,
// connectionTimeoutMillis: 2000,

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

// const pool = new Pool({
//   host: "localhost",
//   port: 8000,

//   database: "rrdb",
// });

// client
//   .connect()
//   .then(() => console.log("connected"))
//   .catch((err) => console.error("connection error", err.stack));

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error("Error acquiring client", err.stack);
//   }
//   client.query("SELECT NOW()", (err, result) => {
//     release();
//     if (err) {
//       return console.error("Error executing query", err.stack);
//     }
//     console.log(result.rows);
//   });
// });

pool
  .connect()
  .then(() => console.log("db connected"))
  .catch((err) => console.log("connection error with db", err));

module.exports = pool;
