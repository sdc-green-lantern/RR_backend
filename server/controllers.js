const model = require("./model.js");

module.exports.getReviewsById = (req, res) => {
  console.log("request recieved by controller");
  let reqData = req.query.product_id;
  model
    .getAllReviews(reqData)
    .then((data) => res.send(data.rows))
    .catch((err) => console.log(err));
};

module.exports.postNewReview = (req, res) => {
  console.log("post at controller");
  console.log(req.body);

  // req will be in the body this time, not query
  model
    .postNewReview(/*potentially multiple args for multiple queries*/)
    .then((data) => res.sendStatus(201))
    .catch((err) => console.log(err));
};

module.exports.getMeta = (req, res) => {
  console.log("request for meta received by controller");
  let reqData = req.query.product_id;
  let data = {};

  model
    .getMetaById(reqData)
    .then((response) => {
      let result = response.rows[0];

      data.product_id = reqData;
      data.ratings = {
        1: result.star1,
        2: result.star2,
        3: result.star3,
        4: result.star4,
        5: result.star5,
      };
      data.recommended = {
        true: result.recommend_true,
        false: result.recommend_false,
      };
      let characteristics = {};

      result.comfort_id
        ? (characteristics.Comfort = {
            [result.comfort_id]: result.comfort_avg,
          })
        : null;
      result.quality_id
        ? (characteristics.Quality = {
            [result.quality_id]: result.quality_avg,
          })
        : null;
      result.size_id
        ? (characteristics.Size = {
            [result.size_id]: result.size_avg,
          })
        : null;
      result.width_id
        ? (characteristics.Width = {
            [result.width_id]: result.width_avg,
          })
        : null;
      result.fit_id
        ? (characteristics.Fit = {
            [result.fit_id]: result.fit_avg,
          })
        : null;
      result.length_id
        ? (characteristics.Length = {
            [result.length_id]: result.length_avg,
          })
        : null;

      data.characteristics = characteristics;

      // res.send(response.rows);
      res.send(data);
    })
    .catch((err) => console.log(err));
};

module.exports.reportReview = (req, res) => {
  console.log("report, controller");
  let queryData = req.query.review_id;
  model
    .reportReview(queryData)
    .then((data) => {
      console.log("done", data);
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
};

module.exports.markReviewHelpful = (req, res) => {
  console.log("helpful, controller");
  let queryData = req.query.review_id;
  model
    .markReviewHelpful(queryData)
    .then((data) => {
      console.log("done", data);
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
};
