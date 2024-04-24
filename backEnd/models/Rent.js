const con = require("../database/db");
const moment = require("moment");

con.connect((err) => {
  if (err) {
    console.error("Erro ao conectar-se ao banco de dados:", err.stack);
    return;
  }
});

const createLibraryTableSQL = `
CREATE TABLE IF NOT EXISTS rents(
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_books INT NOT NULL,
  id_user INT NOT NULL,
  pick_up_date DATETIME,
  returns_date DATETIME,
  FOREIGN KEY (id_books) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  renewed BOOLEAN DEFAULT 0
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

function findRents(id) {
  return new Promise((resolve, reject) => {
    const find = "SELECT * FROM rents WHERE id=?";
    con.query(find, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

function createRents(id_books, id_user, pick_up_date, returns_date) {
  return new Promise((resolve, reject) => {
    const rentBookQuery =
      "UPDATE books SET quantity = GREATEST(quantity - 1, 0) WHERE id = ?";
    const insertRentQuery =
      "INSERT INTO rents (id_books, id_user, pick_up_date, returns_date) VALUES (?, ?, ?, ?)";
    const values = [id_books, id_user, pick_up_date, returns_date];

    con.query(rentBookQuery, [id_books], (err, result) => {
      if (err) {
        return reject(err);
      }

      con.query(insertRentQuery, values, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  });
}

function updateRents(id, returns_date, renewed) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM rents WHERE id = ?";
    con.query(sql, [id], (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.length === 0) {
        return reject("Rent not found.");
      }

      if (result[0].renewed === 1) {
        return resolve({
          error:
            "Can't renew the data again",
        });
      }

      const updateQuery =
        "UPDATE rents SET returns_date = ?, renewed = ? WHERE id = ?";
      const values = [returns_date, renewed, id];

      con.query(updateQuery, values, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  });
}

function deleteRents(id) {
  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT * FROM rents WHERE id = ?";
    con.query(selectQuery, [id], (err, result) => {
      if (err) {
        return reject(err);
      }

      if (result.length === 0) {
        return reject("Rent not found.");
      }

      const { id_books } = result[0];

      const deleteBookQuery = "UPDATE books SET quantity = quantity + 1 WHERE id = ?";
      con.query(deleteBookQuery, [id_books], (err, result) => {
        if (err) {
          return reject(err);
        }

        const deleteRentQuery = "DELETE FROM rents WHERE id = ?";
        con.query(deleteRentQuery, [id], (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    });
  });
}

module.exports = {
  allRents,
  findRents,
  createRents,
  updateRents,
  deleteRents,
};
