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
  // console.log("request for report");
  controller.reportReview(req, res);
});

//PUT /reviews/:review_id/helpful
//204
app.put("/reviews/:review_id/helpful", (req, res) => {
  // console.log("request for helpful");
  controller.markReviewHelpful(req, res);
});

app.get("/reviews/meta", (req, res) => {
  // console.log("request for metadata");
  controller.getMeta(req, res);
});

//page, count, sort, product_id
app.get("/reviews", (req, res) => {
  // console.log("request for reviews");

  controller.getReviewsById(req, res);
});

//POST /reviews
//201
app.post("/reviews", (req, res) => {
  // console.log("req review POST");

  controller.postNewReview(req, res);
});

////////////////////////////////////////////////////////
let PORT = 3000;
app.listen(PORT);
console.log(`Listening at http://localhost:${PORT}`);

/// TO DO AND THOUGHTS //
