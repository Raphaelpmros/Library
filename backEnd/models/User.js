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

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    var find = "SELECT * FROM users WHERE email=?";
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
  full_name,
  full_address,
  additional_address_details,
  phone,
  password
) {
  return new Promise((resolve, reject) => {
    const passwordHash = bcrypt.hashSync(password, salts);
    let change =
      "UPDATE users SET full_name = ?, full_address = ?, additional_address_details = ?, phone = ?, password = ?";
    let values = [
      full_name,
      full_address,
      additional_address_details,
      phone,
      passwordHash,
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
