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
//PUT /reviews/:review_id/report
//204
app.put("/reviews/:review_id/report", (req, res) => {
  console.log("request for report");
  controller.reportReview(req, res);
});

//PUT /reviews/:review_id/helpful
//204
app.put("/reviews/:review_id/helpful", (req, res) => {
  console.log("request for helpful");
  controller.markReviewHelpful(req, res);
});

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

////////////////////////////////////////////////////////

app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT}`);

/// TO DO AND THOUGHTS //

//reviews does not have a link to characteristics or review_photos, ill need to make one
//~~actually only for photos, characteristics are sepperated into their own api call...

//set up reviews/product_id/meta to return obj with reviews.ratings info and characteristic info with names instead of numbers

//believe im only returning one review at a time, not the full list
