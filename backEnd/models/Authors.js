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