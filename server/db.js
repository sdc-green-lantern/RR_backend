require("dotenv").config();
// import postgres from "postgres";
var pgp = require("pgp");
const { Pool, Client } = require("pg");

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   max: 20,
//   connectionTimeoutMillis: 0,
//   idleTimeoutMillis: 0,
//   // port: 9000,
// });

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool
  .connect()
  .then(() => {
    console.log("db connected");

    // Promise.all([
    //   pool.query(
    //     `UPDATE chars_full SET star1 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 1) WHERE chars_full.product_id BETWEEN 1 AND 5;`
    //   ),
    //   pool.query(
    //     `UPDATE chars_full SET star2 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 2) WHERE chars_full.product_id BETWEEN 1 AND 5;`
    //   ),
    //   pool.query(
    //     `UPDATE chars_full SET star3 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 3) WHERE chars_full.product_id BETWEEN 1 AND 5;`
    //   ),
    //   pool.query(
    //     `UPDATE chars_full SET star4 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 4) WHERE chars_full.product_id BETWEEN 1 AND 5;`
    //   ),
    //   pool.query(
    //     `UPDATE chars_full SET star5 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 5) WHERE chars_full.product_id BETWEEN 1 AND 5;`
    //   ),
    // ])
    //   .then(() => console.log("done w/ etl"))
    //   .catch((err) => console.log(err.stack));
  })
  .catch((err) => console.log("connection error with db", err));

module.exports = pool;
