const express = require("express");
const router = express.Router();
const { Spot, Review, SpotImage, User, sequelize } = require("../../db/models");
const { check, query } = require("express-validator");







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

module.exports = router;
