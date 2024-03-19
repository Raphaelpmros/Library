const users = require("../controllers/users");
const express = require("express");
const router = express();

router.get("/", users.users);
router.post("/new", users.new);
router.post("/update", users.update);
router.post("/:id", users.delete);

module.exports = router;