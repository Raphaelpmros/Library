const categories = require("../controllers/categories");
const express = require("express");
const router = express();

router.get("/", categories.categories);
router.post("/new", categories.new);
router.patch("/update/:id", categories.update)
router.get("/:id", categories.findCategories)
router.delete("/:id", categories.delete)

module.exports = router;
