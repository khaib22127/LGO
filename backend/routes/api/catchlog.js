const express = require("express");
const router = express.Router();

// Get all CatchLog by a Spot's id
// GET /api/spots/:spotId/catch
router.get("/:spotId/catches")


module.exports = router;
