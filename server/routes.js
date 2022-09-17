const express = require("express");
const router = express.Router();
const model = require("./model.js");

router.get("/reviews", model.getAll);

module.exports = router;

//going to need to route into the 3 tables reviews, characteristics, and photos
