const con = require('../database/db');

con.connect((err) => {
  if (err) {
    console.error('Erro ao conectar-se ao banco de dados:', err.stack);
    return;
  }

  console.log('Conectado ao banco de dados.');
});

const createLibraryTableSQL = `
CREATE TABLE IF NOT EXISTS authors(
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(45),
    nationality VARCHAR(30)
)`;

con.query(createLibraryTableSQL, (err, result) => {
  if (err) {
    console.error('Erro ao criar tabela authors:', err);
    return;
  }

  console.log('Tabela authors criada com sucesso.');
});

function createAuthor(fullName, nationality) {
  return new Promise((resolve, reject) => {
    con.connect((err) => {
      if(err) {
        reject(err);
      } else {
        var sql = "INSERT INTO authors (fullName, nationality) VALUES (?, ?)";
        var values = [fullName, national]
        con.query(sql, values, (err, res) => {
          if(err) {
            console.error(err);
            return res.status(500).send("Erro ao cadastrar o autor");
          } else {
            resolve(result)
          }
        })
      }
    })
  })
}
