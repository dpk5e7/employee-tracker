const cTable = require("console.table");
const db = require("./DBPool");

class Employee {
  constructor() {}

  static async viewAll() {
    // a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

    const results = await db.execute(
      `SELECT E1.id AS ID, E1.first_name AS "First Name", E1.last_name AS "Last Name", role.title AS "Role", CONCAT(E2.first_name, ' ', E2.last_name) AS "Manager" FROM employee E1 JOIN role ON E1.role_id = role.id LEFT JOIN employee E2 ON E1.manager_id = E2.id`
    );

    const table = cTable.getTable(results[0]);
    console.log("\n");
    console.log(table);
  }

  static async add(firstName, lastName, role, manager) {
    // employee’s first name, last name, role, and manager, and that employee is added to the database
  }

  static async updateRole(employeeID, newRoleID) {
    // employee to update and their new role and this information is updated in the database
  }
}

module.exports = Employee;
