const model = require("./model.js");

module.exports.getReviewsById = (req, res) => {
  // console.log("request recieved by controller");
  let reqData = req.query.product_id;
  model
    .getAllReviews(reqData)
    .then((data) => res.send(data.rows))
    .catch((err) => console.log(err));
};

module.exports.postNewReview = (req, res) => {
  // console.log("post at controller");
  // console.log(req.body);

  let created_at = new Date();
  let rec = req.body.recommend === "true" ? true : false;
  let usrPhotos = JSON.parse(req.body.photos);
  let chars = JSON.parse(req.body.characteristics);
  let usrChars = req.body.characteristics;

  model
    .postNewReview(req.body, created_at)

    .then((reviewID) => {
      model.updateMetaStarRec(
        req.body.product_id,
        reviewID.rows[0].review_id,
        Number(req.body.rating),
        rec
      );
      return reviewID;
    })

    .then((reviewID) => {
      // console.log("made it to photos");
      if (usrPhotos.length && usrPhotos.length > 0) {
        usrPhotos.forEach((url) =>
          model.postReviewPhotos(reviewID.rows[0].review_id, url)
        );
      }
      return reviewID;
    })
    // .then((reviewID) => {
    // console.log("made it to meta");

    //   for (let [charID, charVal] of Object.entries(chars)) {
    //     console.log("meta controller", charID, charVal);
    //     model.updateMeta(
    //       req.body.product_id,
    //       reviewID.rows[0].review_id,
    //       charID,
    //       charVal
    //     );
    //   }
    // })
    .then(() => res.sendStatus(201))
    .catch((err) => console.log(err));
};

module.exports.getMeta = (req, res) => {
  // console.log("request for meta received by controller");
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
  // console.log("report, controller");
  let queryData = req.query.review_id;
  model
    .reportReview(queryData)
    .then((data) => {
      // console.log("done", data);
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
};

module.exports.markReviewHelpful = (req, res) => {
  // console.log("helpful, controller");
  let queryData = req.query.review_id;
  model
    .markReviewHelpful(queryData)
    .then((data) => {
      // console.log("done", data);
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
};
