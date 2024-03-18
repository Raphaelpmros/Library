const con = require('../database/db');

con.connect((err) => {
  if (err) {
    console.error('Erro ao conectar-se ao banco de dados:', err.stack);
    return;
  }

  console.log('Conectado ao banco de dados.');
});

const createLibraryTableSQL = `
CREATE TABLE IF NOT EXISTS rents(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_books INT NOT NULL,
    id_user INT NOT NULL,
    pick_up_date DATETIME,
    returns_date DATETIME,
    FOREIGN KEY (id_books) REFERENCES books(id),
    FOREIGN KEY (id_user) REFERENCES users(id)
)`;

con.query(createLibraryTableSQL, (err, result) => {
  if (err) {
    console.error('Erro ao criar tabela rents:', err);
    return;
  }

  console.log('Tabela rents criada com sucesso.');
});