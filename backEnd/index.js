const bodyParser = require("body-parser");
const con = require("./database/db");
const express = require("express");
const path = require("path");
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const categories = require("./routes/categories");
const reviews = require ("./routes/reviews");
const authors = require("./routes/authors");
const books = require ("./routes/books");
const rents = require ("./routes/rents");
const users = require ("./routes/users");

require("./seeds/category")
require("./seeds/author")
require("./seeds/admin")

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(bodyParser.json());

app.use("/categories", categories);
app.use("/reviews", reviews);
app.use("/authors", authors);
app.use("/books", books);
app.use("/rents", rents);
app.use("/users", users);



app.listen(process.env.SERVER_PORT, () => {
  console.log("listenning on port");
});
