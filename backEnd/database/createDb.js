const mysql = require('mysql2');
require('dotenv').config();

const createDb = () => {
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    con.connect((err) => {
      if (err) {
        reject(err);
        return;
      }
      
      console.log("Connected!");
      
      con.query("CREATE DATABASE IF NOT EXISTS library", (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        console.log("Database created");
        resolve();
      });
    });
  });
};

module.exports = createDb;
