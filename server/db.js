require("dotenv").config();
// import postgres from "postgres";
var pgp = require("pgp");
const { Pool, Client } = require("pg");

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

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.PORT || 3000,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(() => console.log("connected"))
  .catch((err) => console.error("connection error", err.stack));

module.exports = client;
