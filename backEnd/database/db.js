const mysql = require('mysql2');

const conConfig = {
  host: 'mysql-db',
  user: 'root',
  password: 'root',
  database: 'library'
};

const con = mysql.createConnection(conConfig);

con.connect((err) => {
  if (err) {
    console.error('Erro ao conectar-se ao banco de dados:', err.stack);
    return;
  }

  console.log('Conectado ao banco de dados.');
});

module.exports = con;