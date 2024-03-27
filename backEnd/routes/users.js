const users = require("../controllers/users");
const passport = require("passport");
const express = require("express");
const router = express();

const { storage } = require('../cloudinary/cloudinary')
const multer = require('multer')
const upload = multer({ storage })

passport.use('login', users.validatePassword);
passport.deserializeUser(users.valid);
passport.serializeUser(users.valid);
passport.use('protect', users.validateToken);

router.post("/update", upload.single("image"), users.update);
router.post("/new", upload.single("image"), users.new);
router.post("/login", users.login);
router.post("/:id", users.delete);
router.get("/", users.users);

module.exports = router;