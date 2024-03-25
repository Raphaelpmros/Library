const reviews = require("../controllers/reviews");
const express = require("express");
const router = express();

router.get("/:id_books", reviews.reviews);
router.post("/:id_books", reviews.new);
router.delete("/:id_books/:id", reviews.delete);


module.exports = router;
