const model = require("./model.js");

module.exports.getReviewsById = (req, res) => {
  console.log("request recieved by controller");
  let reqData = req.query.product_id;
  model.getAllReviews(reqData, res);
};

module.exports.getMeta = (req, res) => {
  console.log("request for meta received by controller");
  let reqData = req.query.product_id;
  model.getMetaById(reqData, res);
};
