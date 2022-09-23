// import db from "./db.js";
const db = require("./db.js");

module.exports.getAllReviews = (productID) => {
  // console.log("model received request for reviews");

  return db.query(
    `SELECT rvw.*,
      (SELECT (json_agg(imgs.*)) AS photos
      FROM review_photos imgs
      WHERE imgs.review_id = rvw.review_id) AS photos
    FROM reviews rvw
    WHERE rvw.product_id = ${productID};`
  );
};

module.exports.postNewReview = (body, date) => {
  // console.log("post req at model");

  let query = {
    text: `INSERT INTO reviews (
      product_id, rating, created_at, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING review_id;`,

    values: [
      body.product_id,
      body.rating,
      date,
      body.summary,
      body.body,
      body.recommend,
      false,
      body.name,
      body.email,
      0,
    ],
  };

  return db.query(query);
};

module.exports.updateMetaStarRec = (
  productID,
  reviewID,
  rating,
  recommended
) => {
  //star
  db.query(`UPDATE meta SET star${rating} = star${rating} + 1;`).then(() =>
    //recommendations
    recommended === true
      ? db.query(
          `UPDATE meta SET recommend_true = recommend_true + 1 WHERE product_id = ${productID};`
        )
      : db.query(
          `UPDATE meta SET recommend_false = recommend_false + 1 WHERE product_id = ${productID};`
        )
  );
};

module.exports.postReviewPhotos = (reviewID, url) => {
  // console.log("post photos", reviewID, url);
  let query = {
    text: "INSERT INTO review_photos (review_id, url) VALUES ($1, $2);",
    values: [Number(reviewID), url.toString()],
  };
  db.query(query);
};

module.exports.updateMeta = (product_id, reviewID, charID, charVal) => {
  //we will want to update star count, recommended counts, and char avgs
  // console.log("updateMETA");

  //meta update

  //gunna need total for that character_id, add VAL to it, devide that total by the amount + 1 (and maybe set that as new val for future)

  db.query(`
  UPDATE meta
  SET (get column title from charID) =
  (old total value plus new value / old total count + 1)
  WHERE product_id = ${product_id};`);

  // db.query(`
  //   BEGIN;
  //   UPDATE meta SET meta.star${rating} = meta.star${rating} + 1;
  //   CASE
  //     WHEN ${recommended} = 'true'
  //       THEN
  //       UPDATE meta SET meta.recommend_true = meta.recommend_true + 1
  //       WHERE product_id = ${product_id};
  //     WHEN ${recommended} = 'false'
  //       THEN
  //       UPDATE meta SET meta.recommend_false = meta.recommend_false + 1
  //       WHERE product_id = ${product_id};
  //   END;
  //   COMMIT;
  // `);
};

//
// UPDATE meta SET (SELECT ) WHERE product_id = ${product_id}

//

module.exports.getMetaById = (productID) => {
  // console.log("model received meta request for: ", productID);
  //data = product_id
  return db.query(`SELECT * FROM meta WHERE product_id = ${productID}`);
};

module.exports.markReviewHelpful = (reviewID) => {
  // console.log("model to mark as helpful");
  //data = review_id
  //reviews.helpfulness
  return db.query(`
    UPDATE reviews
    SET helpfulness = helpfulness::INTEGER + 1
    WHERE reviews.review_id = ${reviewID}
  `);
};

module.exports.reportReview = (reviewID) => {
  // console.log("model to report review");
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
