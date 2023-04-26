const express = require("express");
const router = express.Router();
const {
  Spot,
  Review,
  SpotImage,
  User,
  SpotSave,
  sequelize,
} = require("../../db/models");
const { requireAuth, userPermission } = require("../../utils/auth");

// Get all user saved spot
// GET /api/saves/current
router.get("/current", requireAuth, async (req, res) => {
  const allSavedSpots = await SpotSave.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: Spot,
      },
    ],
    attributes: [],
  });

  res.json(allSavedSpots);
});

//Create A Save Spot
// POST /api/saves
router.post("/", async (req, res) => {
  const userId = req.user.id;
  const { spotId } = req.body;

  const spotSaved = await SpotSave.create({
    userId: userId,
    spotId,
  });

  await spotSaved.save();
  return res.json(spotSaved);
});

//Delete a saved spots
// DELETE /api/saves/:saveId
router.delete("/:saveId", requireAuth, async (req, res) => {
  const savedSpot = await SpotSave.findByPk(req.params.saveId);

await savedSpot.destroy()

return res.json({
  message: "Successfully deleted",
  statusCode: 200,
});
});

module.exports = router;
