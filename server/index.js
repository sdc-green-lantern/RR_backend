var express = require("express");
var fs = require("fs");
var { parse } = require("csv-parse");

let date = new Date(1596080481467);
console.log(date);

function convertDateTime(value) {
  const timestamp = new Date(value);
  // let date = timestamp.toLocaleDateString("en-US");
  // let time = timestamp.toLocaleTimeString("en-US");
  // return date + " " + time;
  return timestamp;
}
console.log(convertDateTime(1596080481467));

//this is just like the date originally turned by the api

//to_timestamp(1596080481467)

//select extract(epoch from date)

// var parser = parse({ columns: true }, function (err, records) {
//   console.log(records);
// });

let result = [];

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
