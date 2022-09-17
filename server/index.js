require("dotenv").config();
var express = require("express");
var fs = require("fs");
var { parse } = require("csv-parse");
const path = require("path");
var router = require("./routes.js");
const controller = require("./controllers.js");

// fs.createReadStream(
//   __dirname + "/../csv_files/characteristic_reviews.csv"
// ).pipe(parser);

// fs.createReadStream(__dirname + "/../csv_files/characteristic_reviews.csv")
//   .pipe(parse())
//   .on("data", (data) => {
//     result.push(data);
//   })
//   .on("end", () => {
//     console.log(result[0]);
//   });

const app = express();

app.use(express.json());
// app.use("/reviews", router);

/////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////

app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT}`);
