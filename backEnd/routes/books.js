const books = require("../controllers/books");
const express = require("express");
const router = express();
const admin = require("../middleware/admin")

router.get("/", books.books);
router.get("/:id", books.findBooks)
router.post("/new", admin, books.new);
router.post("/update", admin, books.updateBook)
router.delete("/:id", admin, books.delete);

module.exports = router;