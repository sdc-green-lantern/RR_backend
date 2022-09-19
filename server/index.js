require("dotenv").config();
var express = require("express");
var fs = require("fs");
var { parse } = require("csv-parse");
const path = require("path");
var router = require("./routes.js");
const controller = require("./controllers.js");

const app = express();

app.use(express.json());
// app.use("/reviews", router);

///////////////////  ROUTES  ///////////////////////////

app.get("/reviews/meta", (req, res) => {
  console.log("request for metadata");
  controller.getMeta(req, res);
});

//page, count, sort, product_id
app.get("/reviews", (req, res) => {
  console.log("request for reviews");
  console.log(req.query.product_id);

  controller.getReviewsById(req, res);
});

//POST /reviews
//201

//PUT /reviews/:review_id/helpful
//204

//PUT /reviews/:review_id/report
//204

////////////////////////////////////////////////////////

app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT}`);

/// TO DO AND THOUGHTS //

//reviews does not have a link to characteristics or review_photos, ill need to make one
//~~actually only for photos, characteristics are sepperated into their own api call...

//set up link between an individual review and its photos
//query returning all entire review with one photo (for as many times as there are photos) rather than returning one review with many photos...

//set up getReviewsById to transform response data in the controller (ideally, maybe model for ease) for things like count, sort, etc...

//set up reviews/product_id/meta to return obj with reviews.ratings info and characteristic info with names instead of numbers
