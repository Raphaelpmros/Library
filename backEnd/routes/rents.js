const rents = require("../controllers/rents");
const express = require("express");
const router = express();

router.get("/", rents.rents)
router.post("/new", rents.new)

module.exports = router;