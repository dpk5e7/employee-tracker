const cTable = require("console.table");
const db = require("./DBPool");

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

  static async add(name, salary, department) {
    // name, salary, and department for the role and that role is added to the database
  }
}

module.exports = Role;
