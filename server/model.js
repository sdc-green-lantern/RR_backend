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

module.exports.postNewReview = (
  product_id,
  rating,
  // created_at,
  summary,
  body,
  recommend,
  name,
  email
) => {
  console.log("post req at model");

  // to_timestamp(cast(created_at/1000 as bigint))::date,
  //
  //date no work "syntax error at or near Sep"
  //
  // ${product_id}, ${rating}, ${created_at}::date, ${summary}, ${body}, ${recommend}, ${false}, ${name}, ${email}, ${0})

  return db.query(`
  INSERT INTO reviews (
    product_id, rating, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness)
  VALUES (
    ${product_id}, ${rating}, ${summary}, ${body}, ${recommend}, ${false}, ${name}, ${email}, ${0})
  RETURNING review_id;
  `);
};

module.exports.postReviewPhotos = (reviewID, url) => {
  console.log("post photos", reviewID);
  db.query(`
    INSERT INTO review_photos (review_id, url) VALUES (${reviewID}, ${url})
  `);
};

module.exports.postCharacteristics = (
  charID,
  reviewID,
  charVal,
  product_id
) => {
  console.log("post chars", product_id);
  db.query(`
    INSERT INTO characteristics (
      characteristic_id, review_id, val, product_id)
    VALUES (${charID}, ${reviewID}, ${charVal}, ${product_id})
  `);
};

module.exports.updateMeta = (reviewID, rating, recommended) => {
  //we will want to update star count, recommended counts, and char avgs
  console.log("updateMETA");

  db.query(`
    BEGIN;

    UPDATE TABLE meta SET star${rating} = meta.star${rating} + 1;

    CASE
      WHEN recommended = 'true'
      THEN
      UPDATE meta SET meta.recommend_true = meta.recommend_true + 1;
      WHEN recommended = 'false
      THEN
      UPDATE meta SET meta.recommend_false = meta.recommend_false + 1;
    END;

    COMMIT;
  `);
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
