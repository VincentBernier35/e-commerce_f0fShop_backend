const reviewDataMapper = require("../models/reviewDataMapper");

const jwt = require("jsonwebtoken");
console.log("jwt", jwt);

//********************************************************* */ READ ALL REVIEW
const fetchAllReview = async (_, res) => {
  const review = await reviewDataMapper.getAllReview();
  return res.status(200).json(review);
};

//********************************************************* */ READ ONE REVIEW
const fetchOneReview = async (req, res) => {
  const { id } = req.params;
  const oneReview = await reviewDataMapper.fetchOneReview(id);
  return res.status(200).json(oneReview);
};

//********************************************************* */ CREATE REVIEW
const createNewReview = async (req, res) => {
  const review = req.body;
  console.log("**file_reviewController******inside controller data from front !*******", review);

  const result = await reviewDataMapper.createNewReviewDataMapper(review);
  console.log("A new review was inserted into DB", result);

  return res.status(201).json(result);
};

//********************************************************* */ UPDATE REVIEW

const modifyOneReview = async (req, res) => {
  const review = await reviewDataMapper.fetchOneReview(req.params.id);
  if (!review) {
    console.log("This review does not exists");
  }

  if (req.body.review || req.body.first_name || req.body.customer_id) {
    const existingReview = await reviewDataMapper.isUnique(req.body, req.params.id);
    if (existingReview) {
      let field;
      if (existingReview.review === req.body.review) {
        field = "review";
        if (existingReview.first_name === req.body.first_name) {
          field = "first_name";
        }
        if (existingReview.first_name === req.body.customer_id) {
          field = "customer_id";
        }
      }

    } else {
      console.log("review wrong");
    }
  }
  const savedPost = await reviewDataMapper.modifyOneReview(req.params.id, req.body);
  return res.json(savedPost);

};
// DELETE ONE REVIEW
const deleteOneReview = async (req, res) => {
  const reviewId = req.params.id;
  const result = await reviewDataMapper.deleteOneReview(reviewId);
  console.log("a review was deleted");
  return res.status(200).json(result);
};


module.exports = { fetchAllReview, fetchOneReview, createNewReview, modifyOneReview,deleteOneReview };
