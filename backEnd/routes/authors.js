const express = require("express");
const router = express.Router();
const authors = require("../controllers/authors");

router.get("/authors", authors.authors)
router.get("/authors/new", authors.new)