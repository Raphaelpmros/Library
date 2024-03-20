const { update } = require("../controllers/categories");
const con = require("../database/db");

con.connect((err) => {
  if (err) {
    console.error("Erro ao conectar-se ao banco de dados:", err.stack);
    return;
  }

  console.log("Conectado ao banco de dados.");
});

const createLibraryTableSQL = `
CREATE TABLE IF NOT EXISTS authors(
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(45),
    nationality VARCHAR(30)
)`;

con.query(createLibraryTableSQL, (err, result) => {
  if (err) {
    console.error("Erro ao criar tabela authors:", err);
    return;
  }

  console.log("Tabela authors criada com sucesso.");
});

function allAuthors() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM authors";
    con.query(sql, (err, results) => {
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

function findAuthorByName(full_name) {
  return new Promise((resolve, reject) => {
    var find = "SELECT * FROM authors WHERE full_name=?";
    con.query(find, [full_name], (err, result) => {
      if(err) {
        return reject(err)
      }
      resolve(result);
    });
  });
}

function updateAuthor(id, newName, newNationality) {
  return new Promise((resolve, reject) => {
    let change = "UPDATE authors SET full_name = ?, nationality = ? WHERE  id = ?";
    con.query(change, [newName, newNationality,  id], function (err, result) {
      if(err) {
        return reject(err)
      }
      resolve(result);
    })
  })
}

function deleteAuthor(id) {
  return new Promise((resolve, reject) => {
    let remove = "DELETE FROM authors WHERE id = ?"
    con.query(remove [id], (err, result) => {
      if(err) {
        return reject(err)
      }
      resolve(result);
    })
  })
}

module.exports = {
  allAuthors,
  createAuthor,
  findAuthorByName,
  updateAuthor
};
