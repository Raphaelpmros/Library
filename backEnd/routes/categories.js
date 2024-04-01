const categories = require("../controllers/categories");
const express = require("express");
const router = express();
const admin = require("../middleware/admin")

router.get("/", categories.categories);
router.post("/new", admin, categories.new);
router.post("/update", admin, categories.update)
router.delete("/:id", admin, categories.delete)

module.exports = router;
