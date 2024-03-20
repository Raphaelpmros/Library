const authors = require("../controllers/authors");
const express = require("express");
const router = express();

router.get("/", authors.authors)
router.post("/new", authors.new)
router.post("/update", authors.update);
router.post("/:id", authors.delete)
module.exports = router;