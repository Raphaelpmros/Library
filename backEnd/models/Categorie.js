const con = require("../database/db");

con.connect((err) => {
  if (err) {
    console.error("Erro ao conectar-se ao banco de dados:", err.stack);
    return;
  }

  console.log("Conectado ao banco de dados.");
});

const createLibraryTableSQL = `
CREATE TABLE IF NOT EXISTS categories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
)`;

con.query(createLibraryTableSQL, (err, result) => {
  if (err) {
    console.error("Erro ao criar tabela categories:", err);
    return;
  }

  console.log("Tabela categories criada com sucesso.");
});

function allCategories() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM categories";
    con.query(sql, (err, results) => {
      if(err) {
        return reject(err)
      }
      resolve(result);
    });
  });
}


function findCategoriesByName(name) {
  return new Promise((resolve, reject) => {
    const find = "SELECT * FROM categories WHERE name=?";
    con.query(find, [name], (err, result) => {
      if(err) {
        return reject(err)
      }
      resolve(result);
    });
  });
}

function createCategories(name) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO categories (name) VALUES (?)";
    const values = [name];
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(result);
    });
  });
}

function updateCategorieName(id, newName) {
  return new Promise((resolve, reject) => {
    let change = "UPDATE categories SET name = ? WHERE id = ?";
    con.query(change, [newName, id], (err, result) => {
      if(err) {
        return reject(err)
      }
      resolve(result);
    });
  });
}

function deleteCategorie(id) {
  return new Promise((resolve, reject) => {
    let remove = "DELETE FROM categories WHERE id = ?";
    con.query(remove, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  allCategories,
  createCategories,
  findCategoriesByName,
  updateCategorieName,
  deleteCategorie,
};
