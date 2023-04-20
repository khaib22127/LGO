const express = require("express");
const router = express.Router();
const { Spot, Review, SpotImage, User, sequelize } = require("../../db/models");
const { check, query } = require("express-validator");
const { requireAuth } = require("../../utils/auth");

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

if (spot.SpotImages.length){
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
    ],
  });

  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  //   let spotData = spot.toJSON()

  // if (spotData.SpotImages) {
  //   spotData.SpotImages.forEach(spot=> {
  //     spotData.SpotImages = spot.url
  //   })
  // }

  //   console.log("spot:::===> ", spotData.SpotImages)

  res.json(spot);
});

// Create a Spot
// POST /api/spots
router.post("/", requireAuth, async (req, res) => {
  const { address, city, state, country, name, description } = req.body;

  const newSpot = await Spot.create({
    userId: req.user.id,
    categoryId: 1,
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

module.exports = router;
