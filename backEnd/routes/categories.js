const categories = require("../controllers/categories");
const express = require("express");
const router = express();
const admin = require("../middleware/admin")

router.get("/", categories.categories);
router.post("/new", categories.new);
router.patch("/update", categories.update)
router.patch("/id", categories.findCategories)
router.delete("/:id", categories.delete)

module.exports = router;
