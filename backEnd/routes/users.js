const users = require("../controllers/users");
const passport = require("passport");
const express = require("express");
const router = express();

const { storage } = require('../cloudinary/cloudinary')
const multer = require('multer')
const upload = multer({ storage })

passport.deserializeUser(users.valid);
passport.serializeUser(users.valid);
passport.use('protect', users.tokenValid);

router.post("/update", upload.single("image"), users.update);
router.post("/new", upload.single("image"), users.new);
router.post("/login", users.login);
router.delete("/:id", users.delete);
router.get("/", users.users);

module.exports = router;