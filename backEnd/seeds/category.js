const con = require("../database/db");

con.connect((err) => {
  if (err) {
    return console.error(err);
  }
  try {
    const categorieName = "Horror"
    const sql = `INSERT INTO categories (name) VALUES ('${categorieName}')`
    con.query(sql, (err, result) => {
        if(err) {
            return console.log("Category already exist");
        }
        return console.log("Success creating category")
    })
  } catch (err) {
    console.err(err);
  }
});
