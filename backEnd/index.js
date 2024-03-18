const express = require ("express");
const app = express();
const path = require("path");
const con = require("./database/db");
const bodyParser = require("body-parser");
const ejsMate = require("ejs-mate");
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require("method-override");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const authors = require ("./routes/authors");
const books = require ("./routes/books");
const categories = require ("./routes/categories");
const rents = require ("./routes/rents");
const reviews = require ("./routes/reviews");
const users = require ("./routes/users");