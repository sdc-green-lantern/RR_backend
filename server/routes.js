const express = require("express");
const router = express.Router();
const model = require("./model.js");
const controller = require("./controllers.js");

// router.get("/reviews", controller.getAll);

module.exports = router;

//going to need to route into the 3 tables reviews, characteristics, and photos
