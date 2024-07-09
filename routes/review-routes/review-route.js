const express = require("express")
const reviewController = require("../../controllers/review-controller/review-controller") 
const reviewRoute = express.Router()

reviewRoute.post("/",reviewController.createReview)
reviewRoute.get("/", reviewController.getReview)
reviewRoute.put("/", reviewController.updateReview)
reviewRoute.delete("/", reviewController.deleteReview)


module.exports = reviewRoute ;