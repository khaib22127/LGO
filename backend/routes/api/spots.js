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

return res.json({Spots: spots})
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


// GET /api/spots/current
router.get("/current", requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id,
    },
    include: [
      {
        model: SpotImage,
      },
    ],
  });


  res.json({ Spots: spots });
});

module.exports = router;
