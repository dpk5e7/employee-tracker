const mysql = require("mysql2/promise");

const DBPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "vader",
  database: "employee_tracker_db",
});

module.exports = DBPool;
