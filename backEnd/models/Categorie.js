const con = require("../database/db");

con.connect((err) => {
  if (err) {
    console.error("Fail connecting database:", err.stack);
    return;
  }
});

const createLibraryTableSQL = `
CREATE TABLE IF NOT EXISTS categories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE
)`;

con.query(createLibraryTableSQL, (err, result) => {
  if (err) {
    console.error("Error creating category's table:", err);
    return;
  }

  console.log("Category's table successfuly created.");
});

function allCategories() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM categories";
    con.query(sql, (err, result) => {
      if(err) {
        return reject(err)
      }
      resolve(result);
    });
  });
}


function findCategories(id) {
  return new Promise((resolve, reject) => {
    const find = "SELECT * FROM categories WHERE id=?";
    con.query(find, [id], (err, result) => {
      if(err) {
        return reject(err)
      }
      return resolve(result);
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
      return resolve(result);
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
      return resolve(result);
    });
  });
}

module.exports = {
  allCategories,
  createCategories,
  findCategories,
  updateCategorieName,
  deleteCategorie,
};
