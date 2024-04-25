const books = require("../controllers/books");
const express = require("express");
const router = express();
const admin = require("../middleware/admin")

const { storage } = require('../cloudinary/cloudinary')
const multer = require('multer')
const upload = multer({ storage })

router.get("/", books.books);
router.get("/:id", books.findBooks)
router.post("/", upload.single("image"), books.new);
router.patch("/update/:id", upload.single("image"), books.updateBook)
router.delete("/:id", books.delete);

module.exports = router;