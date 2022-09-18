// import db from "./db.js";
const db = require("./db.js");
//going to have queries for any operation

module.exports.getAll = (data, callback) => {
  console.log("model received request");
  console.log("model", data);
  callback(null, 200);
};

module.exports.getMetaById = (data) => {
  console.log("model received meta request for: ", data);
  // callback(null, 201);
  //data===product_id
  db.query("SELECT rating FROM reviews WHERE product_id = 1000011;")
    .then((res) => console.log(res))
    .catch((err) => console.log(err.stack));
};

//client.query().then().catch
//valid query --> SELECT rating FROM reviews WHERE product_id = 1000011;

//queries can be executed either via text/parameter values passed as individual arguments
//or by passing an options object containing text, (optional) parameter values, and (optional) query name

// client.query({
//   name: "insert beatle",
//   text: "INSERT INTO beatles(name, height, birthday) values($1, $2, $3)",
//   values: ["George", 70, new Date(1946, 02, 14)],
// });
