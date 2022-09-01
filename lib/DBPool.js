const mysql = require("mysql2/promise");

/**
 * Constant to build the MySQL connection pool
 */
const DBPool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  namedPlaceholders: true,
});

module.exports = DBPool;
