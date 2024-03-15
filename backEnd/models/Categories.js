const con = require('../database/db');

con.connect((err) => {
  if (err) {
    console.error('Erro ao conectar-se ao banco de dados:', err.stack);
    return;
  }

  console.log('Conectado ao banco de dados.');
});

const createLibraryTableSQL = `
CREATE TABLE IF NOT EXISTS categories(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
)`;

con.query(createLibraryTableSQL, (err, result) => {
  if (err) {
    console.error('Erro ao criar tabela categories:', err);
    return;
  }

  console.log('Tabela categories criada com sucesso.');
});