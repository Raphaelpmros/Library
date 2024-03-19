const con = require("../database/db");

con.connect((err) => {
  if (err) {
    console.error("Erro ao conectar-se ao banco de dados:", err.stack);
    return;
  }

  console.log("Conectado ao banco de dados.");
});

const createLibraryTableSQL = `
CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(50),
    email VARCHAR(30),
    cpf VARCHAR(14),
    full_address VARCHAR(45),
    additional_address_details VARCHAR(45),
    phone VARCHAR(14),
    password VARCHAR(30)
)`;

con.query(createLibraryTableSQL, (err, result) => {
  if (err) {
    console.error("Erro ao criar tabela users:", err);
    return;
  }

  console.log("Tabela users criada com sucesso.");
});

function allUsers() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users";
    con.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(results);
    });
  });
}

function createUser(
  full_name,
  email,
  cpf,
  full_address,
  additional_address_details,
  phone,
  password
) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO users (full_name, email, cpf, full_address, additional_address_details, phone, password) (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      full_name,
      email,
      cpf,
      full_address,
      additional_address_details,
      phone,
      password,
    ];
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(result);
    });
  });
}


