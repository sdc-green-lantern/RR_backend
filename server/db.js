require("dotenv").config();
// import postgres from "postgres";
var pgp = require("pgp");

// const connection = postgres(
//   "postgres://username:password@host:port/database",
//   {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//   }
// );

const credentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.PORT || 3000,
};

const connection = pgp(credentials); //database instance

module.exports = connection;
