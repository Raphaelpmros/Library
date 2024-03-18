const authors = require("../controllers/authors");
const express = require("express");
const router = express();

router.get("/", authors.authors)
router.post("/new", authors.new)

module.exports = router;