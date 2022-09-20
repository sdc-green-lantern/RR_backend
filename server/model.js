// import db from "./db.js";
const db = require("./db.js");

module.exports.getAllReviews = (data, res) => {
  console.log("model received request for reviews");
  // db.query(
  //   `SELECT (json_agg(review_photos)) FROM review_photos WHERE review_photos.review_id = 5;`
  // ).then((data) => res.send(data.rows[0].json_agg));

  // db.query(
  //   `SELECT * FROM reviews,
  //     (SELECT (json_agg(review_photos))
  //     AS photos
  //     FROM review_photos
  //     WHERE review_photos.review_id = 5)
  //   AS photos
  //   WHERE reviews.product_id = 2;`
  // )

  db.query(
    `SELECT rvw.*,
      (SELECT (json_agg(imgs.*)) AS photos
      FROM review_photos imgs
      WHERE imgs.review_id = rvw.review_id) AS photos
    FROM reviews rvw
    WHERE rvw.product_id = ${data};`
  )
    .then((data) => res.send(data.rows))
    .catch((err) => console.log(err));
};

module.exports.getMetaById = (data, res) => {
  console.log("model received meta request for: ", data);
  //data===product_id
  db.query(`SELECT rating FROM reviews WHERE product_i = ${data}`)
    .then((data) => res.send(data))
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
