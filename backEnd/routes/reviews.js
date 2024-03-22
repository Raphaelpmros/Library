const reviews = require("../controllers/reviews");
const express = require("express");
const router = express();

router.get("/", reviews.reviews)

module.exports = router;