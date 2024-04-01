const rents = require("../controllers/rents");
const express = require("express");
const router = express();
const login = require("../middleware/login")

router.get("/", rents.rents)
router.post("/new", login, rents.new)
router.post("/update", login, rents.update)
router.delete("/:id", login, rents.delete)

module.exports = router;