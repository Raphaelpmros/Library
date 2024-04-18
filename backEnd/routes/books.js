const books = require("../controllers/books");
const express = require("express");
const router = express();
const admin = require("../middleware/admin")

const { storage } = require('../cloudinary/cloudinary')
const multer = require('multer')
const upload = multer({ storage })

router.get("/", books.books);
router.get("/:id", books.findBooks)
router.post("/new", upload.single("image"), books.new);
router.post("/update", admin, upload.single("image"), books.updateBook)
router.delete("/:id", admin, books.delete);

module.exports = router;