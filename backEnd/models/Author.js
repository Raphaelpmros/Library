const con = require("../database/db");

con.connect((err) => {
  if (err) {
    console.error("Fail connecting database:", err.stack);
    return;
  }
});

const createLibraryTableSQL = `
CREATE TABLE IF NOT EXISTS authors(
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(45) UNIQUE,
    nationality VARCHAR(30)
)`;

con.query(createLibraryTableSQL, (err, result) => {
  if (err) {
    console.error("Error creating author's table:", err);
    return;
  }

  console.log("Author's table successfuly created.");
});

function allAuthors() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM authors";
    con.query(sql, (err, result) => {
      if(err) {
        return reject(err)
      }
      resolve(result);
    })
  })
}

function createAuthor(full_name, nationality) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO authors (full_name, nationality) VALUES (?, ?)";
    const values = [full_name, nationality];
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(result);
    });
  });
}

function findAuthor(id) {
  return new Promise((resolve, reject) => {
    var find = "SELECT * FROM authors WHERE id=?";
    con.query(find, [id], (err, result) => {
      if(err) {
        return reject(err)
      }
      resolve(result);
    });
  });
}

function updateAuthor(id, full_name, nationality) {
  return new Promise((resolve, reject) => {
    let change = "UPDATE authors SET full_name = ?, nationality = ? WHERE  id = ?";
    con.query(change, [full_name, nationality,  id], function (err, result) {
      if(err) {
        return reject(err)
      }
      resolve(result);
    })
  })
}

function deleteAuthor(id) {
  return new Promise((resolve, reject) => {
    let remove = "DELETE FROM authors WHERE id = ?";
    con.query(remove, [id], (err, result) => {
      if(err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}


module.exports = {
  allAuthors,
  createAuthor,
  findAuthor,
  updateAuthor,
  deleteAuthor
};
