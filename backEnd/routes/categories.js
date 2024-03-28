const categories = require("../controllers/categories");
const express = require("express");
const router = express();

router.get("/", categories.categories);
router.post("/new", categories.new);
router.post("/update", categories.update)
router.delete("/:id", categories.delete)

module.exports = router;
