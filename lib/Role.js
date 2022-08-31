const cTable = require("console.table");
const db = require("./DBPool");
const Department = require("./Department");

class Role {
  constructor() { }
  
  static async viewAll() {
    // job title, role id, the department that role belongs to, and the salary for that role

    const results = await db.execute(
      `SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department FROM role JOIN department ON department.id = role.department_id`
    );

    const table = cTable.getTable(results[0]);
    console.log("\n");
    console.log(table);
  }

  static async add(title, salary, departmentName) {
    // name, salary, and department for the role and that role is added to the database

    const departmentId = await Department.getDepartmentID(departmentName);

    if (departmentId !== 0) {

      const results = await db.execute(
        "INSERT INTO `role` (`title`, `salary`, `department_id`) VALUES (?, ?, ?)",
        [title, salary, departmentId]
      );

      if (results[0].affectedRows > 0) {
        console.log(
          `\n${title} added successfully at ID #${results[0].insertId}.\n`
        );
      } else {
        console.log("\nFailure adding a new department.\n");
      }
    } else {
      console.log("\nDepartment not found.\n");
    }
  }
}

module.exports = Role;
