const express = require("express");
const router = express.Router();
const { Spot, Review, SpotImage, User } = require("../../db/models");
const { check } = require("express-validator");
const { userValidationErrors } = require("../../utils/validation");
const { requireAuth, userPermission } = require("../../utils/auth");

const validateSpot = [
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ min: 4, max: 50 })
    .withMessage("Name Required"),
  check("address")
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .isLength({ min: 2, max: 50 })
    .withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("description")
    .exists({ checkFalsy: true })
    .isLength({ min: 25 })
    .withMessage("Description needs a minimum of 25 characters"),
  userValidationErrors,
];

// Get all spots
// GET /api/spots
router.get("/", async (req, res, next) => {
  const spots = await Spot.findAll({
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
      },
    ],
  });

  let allSpots = [];
  spots.forEach((spot) => {
    allSpots.push(spot.toJSON());
  });

  allSpots.forEach((spot) => {
    if (spot.SpotImages.length) {
      spot.SpotImages = spot.SpotImages[0].url;
    }
  });
  return res.json({ Spots: spots });
  // return res.json({ Spots: allSpots });
});

// GET /api/spots/current
router.get("/current", async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: SpotImage,
      },
    ],
  });

  // const userSpotData = []
  // userSpotData.push(spots.toJSON())

  res.json({ Spots: spots });
});

// GET /api/spots/:spotId
router.get("/:spotId", async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: SpotImage,
      },
      {
        model: User,
      },
      {
        model: Review,
      },
    ],
  });

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  spot = spot.toJSON();

  spot.numReview = spot.Reviews.length;

  let starAvg;
  let arrStars = [];
  if (spot.Reviews.length === 0) {
    delete spot.Reviews;
  } else {
    spot.Reviews.forEach((reviewStar) => {
      arrStars.push(reviewStar.stars);
      starAvg = arrStars.reduce((a, b) => a + b);
      return starAvg;
    });
  }

  if (!starAvg) {
    spot.averageRating = 0;
  } else {
    spot.averageRating = starAvg / arrStars.length;
  }

  res.json(spot);
});

// Create a Spot
// POST /api/spots
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, name, description, categoryId } = req.body;

  const newSpot = await Spot.create({
    userId: req.user.id,
    categoryId,
    address,
    city,
    state,
    country,
    name,
    description,
  });

  await newSpot.save();
  return res.json(newSpot);
});

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const spotId = req.params.spotId;
  const { url } = req.body;
  const spot = await Spot.findAll({
    where: {
      userId,
    },
  });

  if (!spot) {
    res.status(404);
    res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const image = await SpotImage.create({
    spotId: spotId,
    url,
  });

  return res.json({
    id: image.id,
    url: image.url,
  });
});

// Edit a Spot
// PUT /api/spots/:spotId
router.put(
  "/:spotId",
  requireAuth,
  validateSpot,
  userPermission,
  async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId);
    const { address, city, state, country, name, description, categoryId } = req.body;

    if (!spot) {
      res.status(404);
      res.json({
        message: "Spot couldn't be found",
        statusCode: 404,
      });
    }

    spot.userId = req.user.id;
    spot.categoryId = categoryId;
    spot.name = name;
    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.description = description;

    await spot.save();
    return res.json(spot);
  }
);

// DELETE /api/spots/:spotId
router.delete("/:spotId", requireAuth, userPermission, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);

  await spot.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
