const model = require("./model.js");

module.exports.getReviewsById = (req, res) => {
  console.log("request recieved by controller");
  let reqData = req.query.product_id;
  model.getAll(reqData, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.sendStatus(data);
  });
};

module.exports.getMeta = (req, res) => {
  console.log("request for meta received by controller");
  model.getMetaById(req, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
};
