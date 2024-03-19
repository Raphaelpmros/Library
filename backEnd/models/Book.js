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