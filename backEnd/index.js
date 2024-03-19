const express = require("express");
const app = express();
const path = require("path");
const con = require("./database/db");
const bodyParser = require("body-parser");

const authors = require("./routes/authors");
// const books = require ("./routes/books");
const categories = require("./routes/categories");
// const rents = require ("./routes/rents");
// const reviews = require ("./routes/reviews");
const users = require ("./routes/users");

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/authors", authors);
// app.use("/books", books);
app.use("/categories", categories);
// app.use("/rents", rents);
// app.use("/reviews", reviews);
app.use("/users", users);

app.listen(3030, () => {
  console.log("listenning on port 3030");
});
