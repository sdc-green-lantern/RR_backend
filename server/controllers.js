const model = require("./model.js");

module.exports.getReviewsById = (req, res) => {
  console.log("request recieved by controller");
  let reqData = req.query.product_id;
  model
    .getAllReviews(reqData)
    .then((data) => res.send(data.rows))
    .catch((err) => console.log(err));
};

module.exports.postNewReview = (req, res) => {
  console.log("post at controller");
  console.log(req.body);

  let product_id = Number(req.body.product_id);
  let rating = Number(req.body.rating);
  //this date may not match other database entries, we'll see
  // let created_at = new Date();
  let summary = req.body.summary;
  let body = req.body.body;
  let recommend = req.body.recommend === "true" ? true : false;
  let name = req.body.name;
  let email = req.body.email;
  //will need to do more with this if i want it working properly i think
  let photos = req.body.photos;
  // let characteristics = JSON.parse(req.body.characteristics);
  let characteristics = req.body.characteristics;

  console.log(
    product_id,
    rating,
    // created_at,
    summary,
    body,
    recommend,
    name,
    email,
    photos,
    characteristics
  );
  //for product id want to add new review with
  //prodID int, rating int, reatedAT date, summary str, body str, recommend bool, reportef as false (bool), name as str, email as str, helpfuness int (0)....

  //for photos
  //want to add review id with 1 url for each url (3 images = 3 entries)

  //for characteristics
  //want to add characteristic id and value along with the product id and review id (somehow)

  model
    .postNewReview(
      product_id,
      rating,
      // created_at,
      summary,
      body,
      recommend,
      name,
      email
    )
    .then((reviewID) => {
      if (photos.length) {
        photos.forEach((url) => model.postReviewPhotos(reviewID, url));
      }
      return reviewID;
    })
    .then((reviewID) => {
      //for each key in characteristics we want to post into characteristics the key/val
      for (let [charID, charVal] of Object.entries(characteristics)) {
        model.postCharacteristics(charID, reviewID, charVal, product_id);
      }
      // return reviewID;
    })
    .then((reviewID) => model.updateMeta(reviewID, rating, recommended))
    //i think we can use reviewID to do the updates...
    //we will want to update star count, recommended counts, and char avgs
    .then(() => res.sendStatus(201))

    .catch((err) => console.log(err));
};

module.exports.getMeta = (req, res) => {
  console.log("request for meta received by controller");
  let reqData = req.query.product_id;
  let data = {};

  model
    .getMetaById(reqData)
    .then((response) => {
      let result = response.rows[0];

      data.product_id = reqData;
      data.ratings = {
        1: result.star1,
        2: result.star2,
        3: result.star3,
        4: result.star4,
        5: result.star5,
      };
      data.recommended = {
        true: result.recommend_true,
        false: result.recommend_false,
      };
      let characteristics = {};

      result.comfort_id
        ? (characteristics.Comfort = {
            [result.comfort_id]: result.comfort_avg,
          })
        : null;
      result.quality_id
        ? (characteristics.Quality = {
            [result.quality_id]: result.quality_avg,
          })
        : null;
      result.size_id
        ? (characteristics.Size = {
            [result.size_id]: result.size_avg,
          })
        : null;
      result.width_id
        ? (characteristics.Width = {
            [result.width_id]: result.width_avg,
          })
        : null;
      result.fit_id
        ? (characteristics.Fit = {
            [result.fit_id]: result.fit_avg,
          })
        : null;
      result.length_id
        ? (characteristics.Length = {
            [result.length_id]: result.length_avg,
          })
        : null;

      data.characteristics = characteristics;

      // res.send(response.rows);
      res.send(data);
    })
    .catch((err) => console.log(err));
};

module.exports.reportReview = (req, res) => {
  console.log("report, controller");
  let queryData = req.query.review_id;
  model
    .reportReview(queryData)
    .then((data) => {
      console.log("done", data);
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
};

module.exports.markReviewHelpful = (req, res) => {
  console.log("helpful, controller");
  let queryData = req.query.review_id;
  model
    .markReviewHelpful(queryData)
    .then((data) => {
      console.log("done", data);
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
};
