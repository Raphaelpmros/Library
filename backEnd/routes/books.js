const books = require("../controllers/books");
const express = require("express");
const router = express();

router.get("/", books.books);

module.exports = router;