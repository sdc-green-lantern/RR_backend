const model = require("./model.js");

module.exports.getAll = (req, res) => {
  console.log("request recieved by controller");

  model.getAll(req, (err, data) => {
    if (err) {
      console.log(err);
    }
    res.sendStatus(data);
  });
};
