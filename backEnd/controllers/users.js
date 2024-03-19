const con = require("../database/db");
const bcrypt = require("bcrypt");
const salts = 10;
const User = require("../models/User");

models