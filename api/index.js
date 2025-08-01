const express = require("express");
const router = express.Router();
const restaurantsRouter = require("./restaurants");
const reviewsRouter = require("./reviews");

router.use("/restaurants", restaurantsRouter);
router.use("/reviews", reviewsRouter);

module.exports = router;
