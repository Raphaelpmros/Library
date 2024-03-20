const books = require("../controllers/books");
const express = require("express");
const router = express();

router.get("/", books.books);
router.post("/new", books.new);

module.exports = router;