const authors = require("../controllers/authors");
const express = require("express");
const router = express();
const admin = require("../middleware/admin")

router.get("/", authors.authors)
router.post("/new", authors.new)
router.patch("/update/:id", authors.update);
router.get("/:id", authors.findAuthor)
router.delete("/:id", authors.delete)
module.exports = router;