const con = require("../database/db");

con.connect((err) => {
  if (err) {
    console.error("Erro ao conectar-se ao banco de dados:", err.stack);
    return;
  }

  console.log("Conectado ao banco de dados.");
});

const createLibraryTableSQL = `
CREATE TABLE IF NOT EXISTS rents(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_books INT NOT NULL,
  id_user INT NOT NULL,
  pick_up_date DATETIME,
  returns_date DATETIME,
  FOREIGN KEY (id_books) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
)`;

con.query(createLibraryTableSQL, (err, result) => {
  if (err) {
    console.error("Erro ao criar tabela rents:", err);
    return;
  }

  console.log("Tabela rents criada com sucesso.");
});

function allRents() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM rents";
    con.query(sql, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

function findReview(id_books) {
  return new Promise((resolve, reject) => {
    const find = "SELECT * FROM reviews WHERE id_books=?";
    con.query(find, [id_books], (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result);
    })
  })
}

module.exports = {
  allRents,
  findReview
}
