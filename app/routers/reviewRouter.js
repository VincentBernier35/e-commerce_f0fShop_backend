const express = require("express");
const reviewRouter = express.Router();
const authentication = require("../middlewares/authentication");

const { fetchAllReview, fetchOneReview, createNewReview, modifyOneReview,deleteOneReview }= require("../controllers/reviewController");
// const { refreshToken } = require("../services/jwt");

// routes
// CRUD   toutes les routes ci dessous débute par /review
reviewRouter.get("/", fetchAllReview);
reviewRouter.get("/:id", fetchOneReview);
reviewRouter.post("/", authentication, createNewReview);
reviewRouter.patch("/:id", authentication, modifyOneReview);
reviewRouter.delete("/:id", authentication, deleteOneReview);

module.exports = reviewRouter;