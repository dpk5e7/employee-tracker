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

  static async getArrayOfDepartments() {
    const results = await db.execute(`SELECT name AS Name FROM department`);

    let departmentNames = [];
    if (results) {
      for (const dept of results[0]) {
        departmentNames.push(dept.Name);
      }
    }

    return departmentNames;
  }

  static async getDepartmentID(name) {

    const results = await db.execute('SELECT `id` FROM `department` WHERE `name` = ?', [name]);

    let departmentId = 0;
    if (results) {
      departmentId = results[0][0].id;
    }

    return departmentId;
  }

  static async add(name) {
    // prompted to enter the name of the department and that department is added to the database
    const results = await db.execute(
      "INSERT INTO `department` (`name`) VALUES (?)",
      [name]
    );

    if (results[0].affectedRows > 0) {
      console.log(
        `\n${name} added successfully at ID #${results[0].insertId}.\n`
      );
    } else {
      console.log("\nFailure adding a new department.\n");
    }
  }
}

module.exports = Department;
