const con = require("../database/db");

con.connect((err) => {
  if (err) {
    return console.error(err);
  } else {
    try {
      const authorName = "H. P. Lovecraft";
      const authorNationality = "Americano";
      const sql = `INSERT INTO authors (full_name, nationality) VALUES ('${authorName}', '${authorNationality}')`;
      con.query(sql, (err, result) => {
        if (err) {
          return console.log("Author already exist");
        }
        return console.log("Success creating author");
      });
    } catch (err) {
      console.err(err);
    }
  }
});
