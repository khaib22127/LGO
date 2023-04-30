const express = require("express");
const router = express.Router();
const { Spot, SpotImage, SpotSave } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// Get user saved spot
// GET /api/saves/current
router.get("/current", requireAuth, async (req, res) => {
  const allSavedSpots = await SpotSave.findAll({
    where: {
      userId: req.user.id,
    },
    include: {
      model: Spot,
      include: [{ model: SpotImage }],
    },

    attributes: ["id", "userId"],
  });

  // allSavedSpots = allSavedSpots.toJSON()

  res.json(allSavedSpots);
});

//Create A Save Spot
// POST /api/saves
router.post("/", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const { spotId } = req.body;
  // const spot = await Spot.findAll()

  // const userSavedSpot = await SpotSave.findAll({
  //   where: {
  //     userId: userId
  //   }
  // })

  // let spots = []
  // spot.map(s => {
  //   spots.push(s.toJSON())
  // })

  // spots.forEach(spot=> {

  // userSavedSpot.forEach(user=> {
  // user = user.toJSON()
  //      if (!spot.id) {
  //    res.status(404);
  //    return res.json({
  //      message: "Spot couldn't be found",
  //      statusCode: 404,
  //    });
  // } else if (spot.id === user.spotId) {
  //       res.status(403);
  //       return res.json({
  //         message: "User already saved this spot",
  //         statusCode: 403,
  //       });
  // }
  // })
  // })

  const spotSaved = await SpotSave.create({
    userId: userId,
    spotId,
  });

  await spotSaved.save();
  return res.json(spotSaved);
  // res.send("hellllo")
  // res.json(spots)
});

//Delete a saved spots
// DELETE /api/saves/:spotId
router.delete("/:spotId", requireAuth, async (req, res) => {
  const spotId = req.params.spotId;
  const savedSpot = await SpotSave.findOne({
    where: {
      userId: req.user.id,
      spotId: spotId,
    },
  });

  await savedSpot.destroy();

  return res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
