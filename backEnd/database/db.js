const mysql = require('mysql2');
require('dotenv').config();

const conConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const con = mysql.createConnection(conConfig);

con.connect((err) => {
  if (err) {
    console.error('Error connecting to database', err.stack);
    return;
  }

  console.log('Database connected.');
});

module.exports = con;