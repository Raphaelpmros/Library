const con = require("../database/db");
const bcrypt = require("bcrypt");
const salts = 10;

con.connect((err) => {
  if (err) {
    return console.error(err);
  } else {
    try {
      const password = "admin";
      const passwordHash = bcrypt.hashSync(password, salts);
      const checkAdmin = `SELECT * FROM users WHERE email='admin@admin.com'`;
      const insertAdmin = `INSERT INTO users (full_name, email, cpf, full_address, phone, password, admin) VALUES ('Admin', 'admin@admin.com', '000.000.000-00', 'rua da livraria', '(00)99999-9999', '${passwordHash}', 1);`;
      con.query(checkAdmin, (err, result) => {
        if (result.length > 0) {
          return console.log("Admin already register");
        }
        con.query(insertAdmin, (err, result) => {
            if (err) {
                return console.log("Error inserting admin", err);
            }
            return console.log("Success inserting admin")
        })
      });
    } catch (err) {
      console.err(err);
    }
  }
});
