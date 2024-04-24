const rents = require("../controllers/rents");
const express = require("express");
const router = express();
const login = require("../middleware/login")

router.get("/", rents.rents)
router.post("/new", rents.new)
router.get("/:id", rents.findRents)
router.patch("/update", rents.update)
router.delete("/:id", rents.delete)

module.exports = router;