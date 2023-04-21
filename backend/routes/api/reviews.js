// backend/routes/api/review.js
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { Spot, Review, SpotImage, User, sequelize } = require("../../db/models");
const { requireAuth, userReviewPermission } = require("../../utils/auth");
const {
  userValidationErrors,
  reviewValidationErrors,
} = require("../../utils/validation");

const validateUserReviews = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  userValidationErrors,
];

// GET  /api/reviews/current
router.get("/current", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
  });

  if (!reviews) {
    res.status(400);
    return res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }

  res.json({ Reviews: reviews });
});

// Get all Reviews by a Spot's id
// GET /api/spots/:spotId/reviews
router.get("/:spotId/reviews", async (req, res) => {
  const spotId = req.params.spotId;

  const reviews = await Review.findAll({
    where: { spotId: spotId },
  });

  return res.json(reviews);
});

// Create a Review for a Spot
// POST /api/spots/:spotId/reviews
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateUserReviews,
  async (req, res) => {
    const { review, stars } = req.body;
    const spotId = req.params.spotId;

    const reviews = await Review.findAll({
      where: {
        spotId: req.params.spotId,
        userId: req.user.id,
      },
    });

    for (let userOfReview of reviews) {
      if (userOfReview.userId) {
        res.status(403);
        return res.json({
          message: "User already has a review for this spot",
          statusCode: 403,
        });
      }
    }

    const newReview = await Review.create({
      userId: req.user.id,
      spotId: spotId,
      review,
      stars,
    });

    await newReview.save();
    res.json(newReview);
    return;
  }
);

// Edit a Review
// PUT /api/reviews/:reviewId
router.put(
  "/:reviewId",
  requireAuth,
  userReviewPermission,
  validateUserReviews,
  async (req, res) => {
    const { user } = req;
    const reviewId = req.params.reviewId;
    const reviews = await Review.findByPk(reviewId);

    const { review, stars } = req.body;

    reviews.userId = user.id;
    reviews.review = review;
    reviews.stars = stars;

    await reviews.save();
    res.json(reviews);
  }
);

// Delete a Review
// /api/reviews/:reviewId
router.delete(
  "/:reviewId",
  requireAuth,
  userReviewPermission,
  async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);

    await review.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
);

module.exports = router;
