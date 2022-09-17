// import db from "./db.js";
const db = require("./db.js");
//going to have queries for any operation

module.exports.getAll = (data, callback) => {
  console.log("model received request");
  callback(null, 200);
};
