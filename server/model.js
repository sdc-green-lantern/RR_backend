// import db from "./db.js";
const db = require("./db.js");
//going to have queries for any operation

// module.exports.getAllReviews = (data, res) => {
//   console.log("model received request");
//   db.query(`SELECT * FROM reviews WHERE product_id = ${data}`)
//     .then((data) => res.send(data.rows))
//     .catch((err) => console.log(err));
// };

module.exports.getAllReviews = (data, res) => {
  console.log("model received request");
  db.query(
    `SELECT reviews.*, review_photos.url AS photos FROM reviews, review_photos WHERE reviews.review_id = review_photos.review_id AND reviews.review_id = 5;`
  )
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

module.exports.markReviewHelpful = () => {
  console.log("model to mark as helpful");
};

module.exports.reportReview = () => {
  console.log("model to report review");
};

//getReviewsByCount   -> params: {product_id, sort, count}
//postNewReview       -> body: entire post obj
//markReviewHelpful   -> params: { review_id: id }
//reportReview        -> params: { review_id: id }:
