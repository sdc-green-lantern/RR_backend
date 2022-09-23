require("dotenv").config();
// import postgres from "postgres";
var pgp = require("pgp");
const { Pool, Client } = require("pg");

/////////////////////////////////////
//       THIS WAS SCRAPPED
/////////////////////////////////////

const etl = new Pool({
  host: "localhost",
  database: "rrdb",
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
  port: 9200,
});

etl
  .connect()
  .then(() => {
    console.log("db connected");

    Promise.all([
      etl.query(
        `UPDATE chars_full SET star1 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 1) WHERE chars_full.product_id BETWEEN 1 AND 5;`
      ),
      etl.query(
        `UPDATE chars_full SET star2 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 2) WHERE chars_full.product_id BETWEEN 1 AND 5;`
      ),
      // pool.query(
      //   `UPDATE chars_full SET star3 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 3) WHERE chars_full.product_id BETWEEN 1 AND 5;`
      // ),
      // pool.query(
      //   `UPDATE chars_full SET star4 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 4) WHERE chars_full.product_id BETWEEN 1 AND 5;`
      // ),
      // pool.query(
      //   `UPDATE chars_full SET star5 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 5) WHERE chars_full.product_id BETWEEN 1 AND 5;`
      // ),
    ])
      .then(() => {
        etl.end();
        console.log("done w/ etl");
      })
      .catch((err) => console.log(err.stack));
  })
  .catch((err) => console.log("connection error with db", err));
