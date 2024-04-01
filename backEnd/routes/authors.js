const authors = require("../controllers/authors");
const express = require("express");
const router = express();
const admin = require("../middleware/admin")

router.get("/", authors.authors)
router.post("/new", admin, authors.new)
router.post("/update", admin, authors.update);
router.delete("/:id", admin, authors.delete)
module.exports = router;