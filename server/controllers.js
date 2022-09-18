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
  let reqData = req.query.product_id;
  model.getMetaById(reqData);
  // model.getMetaById(reqData, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.send(data);
  // });
};
