// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const { restoreUser } = require("../../utils/auth.js");

const spotsRouter = require('./spots.js');
const reviewsRouter = require("./reviews.js");
const reviewsSpotRouter = require("./reviews.js")
const catchLogSpotRouter = require("./catchlog.js")
const catchRouter = require("./catchlog.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter)
router.use("/reviews", reviewsRouter);
router.use("/spots", reviewsSpotRouter);
router.use("/catches", catchRouter);
router.use("/spots", catchLogSpotRouter);


module.exports = router;
