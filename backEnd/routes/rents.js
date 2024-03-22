const rents = require("../controllers/rents");
const express = require("express");
const router = express();

router.get("/", rents.rents)
router.post("/new", rents.new)
router.post("/update", rents.update)
router.post("/:id", rents.delete)

module.exports = router;