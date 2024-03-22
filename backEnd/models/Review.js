const con = require("../database/db");

con.connect(function (err) {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }

  console.log("Conexão bem-sucedida ao banco de dados");

  var createLibraryTableSQL = `
  CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY AUTO_INCREMENT, 
    comment VARCHAR(255), 
    rating INT(5), 
    id_books INT, 
    id_user INT, 
    FOREIGN KEY(id_books) REFERENCES books(id) ON DELETE CASCADE, 
    FOREIGN KEY(id_user) REFERENCES users(id) ON DELETE CASCADE
    )`;

  con.query(createLibraryTableSQL, function (err, result) {
    if (err) {
      console.error("Erro ao criar a tabela:", err);
    } else {
      console.log("Tabela reviews criada com sucesso");
    }
  });
});

function allReviews(id_books) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM reviews WHERE id_books=?";
    con.query(sql, [id_books], (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

function createReviews(comment, rating, id_user, id_books) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO reviews (comment, rating, id_user, id_books) VALUES (?, ?, ?, ?)";
    const values = [comment, rating, id_user, id_books];
    con.query(sql, values, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

function deleteReview(reviewId, callback) {
  const sql = "DELETE FROM reviews WHERE id = ?";

  con.query(sql, [reviewId], (error, results) => {
    if (error) {
      console.error("Erro ao excluir a avaliação no MySQL:", error);
      return callback(error, null);
    }

    callback(null, results);
  });
}

module.exports = {
  allReviews,
  createReviews,
  deleteReview,
};
