// import db from "./db.js";
const db = require("./db.js");

module.exports.getAllReviews = (productID) => {
  console.log("model received request for reviews");

  return db.query(
    `SELECT rvw.*,
      (SELECT (json_agg(imgs.*)) AS photos
      FROM review_photos imgs
      WHERE imgs.review_id = rvw.review_id) AS photos
    FROM reviews rvw
    WHERE rvw.product_id = ${productID};`
  );
};

module.exports.postNewReview = (reqBody) => {
  console.log("post req at model");

  // return db.query(``);
};

module.exports.getMetaById = (productID) => {
  console.log("model received meta request for: ", productID);
  //data = product_id
  return db.query(`SELECT * FROM meta WHERE product_id = ${productID}`);
};

module.exports.markReviewHelpful = (reviewID) => {
  console.log("model to mark as helpful");
  //data = review_id
  //reviews.helpfulness
  return db.query(`
    UPDATE reviews
    SET helpfulness = helpfulness::INTEGER + 1
    WHERE reviews.review_id = ${reviewID}
  `);
};

module.exports.reportReview = (reviewID) => {
  console.log("model to report review");
  //data = review_id
  //reviews.reported (bool)
  return db.query(`
  UPDATE reviews
  SET reported = TRUE
  WHERE reviews.review_id = ${reviewID}
  `);
};

//getReviewsByCount   -> params: {product_id, sort, count}
//postNewReview       -> body: entire post obj
//markReviewHelpful   -> params: { review_id: id }
//reportReview        -> params: { review_id: id }:
