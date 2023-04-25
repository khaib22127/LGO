const express = require("express");
const router = express.Router();
const {
  Spot,
  Review,
  SpotImage,
  User,
  CatchLog,
  sequelize,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// Get all CatchLog by a Spot's id
// GET /api/spots/:spotId/catch
router.get("/:spotId/catches", async (req, res) => {
  const spotId = req.params.spotId;
  const catches = await CatchLog.findAll({
    where: { spotId: spotId },
    include: [
      {
        model: User,
      },
    ],
  });

  res.json(catches);
});

// GET  /api/catches/current
router.get("/current", requireAuth, async (req, res) => {
  const catches = await CatchLog.findAll({
    where: { userId: req.user.id },
  });

  if (!catches) {
    res.status(404);
    return res.json({
      message: "CatchLog couldn't be found",
      statusCode: 404,
    });
  }

  res.json(catches);
});

// Create CatchLog for a Spot
// POST  /api/spots/:spotId/catches
router.post("/:spotId/catches", requireAuth, async (req, res) => {
  const { type, weight, length, summary } = req.body;
  const spotId = req.params.spotId;
  const userId = req.user.id;

  const catches = await CatchLog.findAll({
    where: {
      spotId: spotId,
      userId: userId,
    },
  });

  if (!catches) {
    res.status(404);
    return res.json({
      message: "CatchLog couldn't be found",
      statusCode: 404,
    });
  }

const newCatchLog = await CatchLog.create({
  userId: userId,
  spotId: spotId,
  type,
  weight,
  length,
  summary,
});

await newCatchLog.save()
return res.json(newCatchLog)
//   res.send("hellloo");
});


//Edit Catch Log
// PUT /api/catches/:catchId
router.put("/:catchId", requireAuth, async (req, res) => {
const userId = req.user.id;
const catchId = req.params.catchId
 const { type, weight, length, summary } = req.body;

const catches = await CatchLog.findByPk(catchId)

catches.userId = userId;
catches.type = type;
catches.weight = weight;
catches.length = length;
catches.summary = summary;

await catches.save()
res.json(catches)
    // res.send("Hellooo")
})


//Delete Catch Log
// DELETE /api/catches/:catchId
router.delete("/:catchId", requireAuth, async (req, res) => {
    const catchId = req.params.catchId;
    const catches = await CatchLog.findByPk(catchId)

    await catches.destroy()
     res.json({
       message: "Successfully deleted",
       statusCode: 200,
     });
})


module.exports = router;
