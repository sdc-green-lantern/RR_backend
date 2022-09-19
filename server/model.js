// import db from "./db.js";
const db = require("./db.js");
//going to have queries for any operation

module.exports.getAllReviews = (data, res) => {
  console.log("model received request");
  db.query(`SELECT * FROM reviews WHERE product_id = ${data}`)
    .then((data) => res.send(data.rows))
    .catch((err) => console.log(err));
};

module.exports.getMetaById = (data, res) => {
  console.log("model received meta request for: ", data);
  //data===product_id
  db.query(`SELECT rating FROM reviews WHERE product_i = ${data}`)
    .then((data) => res.send(data.rows))
    .catch((err) => console.log(err.stack));
};

//getReviewsByCount   -> params: {product_id, sort, count}
//postNewReview       -> body: entire post obj
//markReviewHelpful   -> params: { review_id: id }
//reportReview        -> params: { review_id: id }:
