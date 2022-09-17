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

app.get("/reviews", (req, res) => {
  console.log("request for reviews");
  controller.getAll(req, res);
  // controller.getAll(req, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.sendStatus(data);
  // });
});

app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT}`);
