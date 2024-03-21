const rents = require("../controllers/rents");
const express = require("express");
const router = express();

router.get("/", rents.rents)

module.exports = router;