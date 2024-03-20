const con = require('../database/db');

con.connect((err) => {
  if (err) {
    console.error('Erro ao conectar-se ao banco de dados:', err.stack);
    return;
  }

  console.log('Conectado ao banco de dados.');
});

const createLibraryTableSQL = `
CREATE TABLE books(
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(45),
  id_authors INT NOT NULL,
  id_categories INT NOT NULL,
  FOREIGN KEY (id_authors) REFERENCES authors(id) ON DELETE CASCADE,
  FOREIGN KEY (id_categories) REFERENCES categories(id) ON DELETE CASCADE
)`;

con.query(createLibraryTableSQL, (err, result) => {
  if (err) {
    console.error('Erro ao criar tabela books:', err);
    return;
  }

  console.log('Tabela books criada com sucesso.');
});

function allBooks() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM books";
    con.query(sql, (err, result) => {
      if(err) {
        return reject(err);
      }
      resolve(result);
    })
  })
}

function findBooks(full_name) {
  return new Promise((resolve, reject) => {
    const find = "SELECT * FROM books WHERE full_name = ?";
    con.query(find, [full_name], (err, result) => {
      if(err) {
        return reject(err);
      }
      resolve(result);
    })
  })
}

function createBooks(full_name, id_authors, id_categories) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO books (full_name, id_authors, id_categories) VALUES (?, ?, ?)";
    const values = [full_name, id_authors, id_categories];
    con.query(sql, values, (err, result) => {
      if(err) {
        return reject(err);
      }
      resolve(result)
    })
  })
}