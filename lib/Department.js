const cTable = require("console.table");
const db = require("./DBPool");

class Department {
  constructor() {}

  static async viewAll() {
    // a formatted table showing department names and department ids

    const results = await db.execute(
      `SELECT id AS ID, name AS Name FROM department`
    );

    const table = cTable.getTable(results[0]);
    console.log("\n");
    console.log(table);
  }

  static async add(name) {
    // prompted to enter the name of the department and that department is added to the database
  }
}

module.exports = Department;
