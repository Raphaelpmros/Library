const con = require("../database/db");
const bcrypt = require('bcrypt');
const salts = 10;


con.connect((err) => {
  if (err) {
    console.error("Erro ao conectar-se ao banco de dados:", err.stack);
    return;
  }

  console.log("Conectado ao banco de dados.");
});

const createLibraryTableSQL = `
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(50),
  imgae LONGTEXT,
  email VARCHAR(30) UNIQUE,
  cpf VARCHAR(14) UNIQUE,
  full_address VARCHAR(45),
  additional_address_details VARCHAR(45),
  phone VARCHAR(14),
  password VARCHAR(255),
  image LONGTEXT,
  admin ENUM('0','1') NOT NULL DEFAULT '0'
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

function oneUser(id) {
  return new Promise((resolve, reject) => {
      con.connect((err) => {
          if (err) {
              return reject(err);
          }
          let sql = `SELECT * FROM users WHERE id='${id}'`;
          con.query(sql, (err, result) => {
              if (err) {
                  return reject(err);
              }
              return resolve(result);
          });
      });
  });
};

function createUser(
  full_name,
  image,
  email,
  cpf,
  full_address,
  additional_address_details,
  phone,
  password
) {
  return new Promise((resolve, reject) => {
    const hashedPassword = bcrypt.hashSync(password, salts);
    const sql =
      `INSERT INTO users (full_name, image, email, cpf, full_address, additional_address_details, phone, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      full_name,
      image,
      email,
      cpf,
      full_address,
      additional_address_details,
      phone,
      hashedPassword
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


function login(email) {
  return new Promise((resolve, reject) => {
    var find = `SELECT * FROM users WHERE email = ?`;
    con.query(find, [email], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(result);
    });
  });
}

function updateUser(
  id,
  full_name,
  image,
  full_address,
  additional_address_details,
  phone,
  password
) {
  return new Promise((resolve, reject) => {
    const passwordHash = bcrypt.hashSync(password, salts);
    let change =
      "UPDATE users SET full_name = ?, image = ?, full_address = ?, additional_address_details = ?, phone = ?, password = ? WHERE id = ?";
    let values = [
      full_name,
      image,
      full_address,
      additional_address_details,
      phone,
      passwordHash,
      id
    ];
    con.query(change, values, (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(result);
    });
  });
}

function deleteUser(id) {
  return new Promise((resolve, reject) => {
    let remove = "DELETE FROM users WHERE id = ?";
    con.query(remove, [id], (err, result) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve(result);
    });
  });
}

module.exports = {
  allUsers,
  oneUser,
  createUser,
  login,
  updateUser,
  deleteUser
};
