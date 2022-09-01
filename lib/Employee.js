const cTable = require("console.table");
const db = require("./DBPool");
const Role = require("./Role");

class Employee {
  constructor() {}

  static async viewAll() {
    // a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

    const results = await db.execute(
      `SELECT E1.id AS ID, E1.first_name AS "First Name", E1.last_name AS "Last Name", role.title AS "Role", role.salary AS "Salary", CONCAT(E2.first_name, ' ', E2.last_name) AS "Manager" FROM employee E1 JOIN role ON E1.role_id = role.id LEFT JOIN employee E2 ON E1.manager_id = E2.id`
    );

    const table = cTable.getTable(results[0]);
    console.log("\n");
    console.log(table);
  }

  static async getArrayOfEmployees() {
    const results = await db.execute(
      `SELECT CONCAT(department.name, ': ', first_name, ' ', last_name) AS Name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY department.name, role.title, Name`
    );

    let employeeNames = [];
    if (results) {
      for (const employee of results[0]) {
        employeeNames.push(employee.Name);
      }
    }

    return employeeNames;
  }

  static async getEmployeeID(firstName, lastName) {
    const results = await db.execute(
      "SELECT `id` FROM `employee` WHERE `first_name` = ? AND `last_name` = ?",
      [firstName, lastName]
    );

    let roleId = 0;
    if (results) {
      roleId = results[0][0].id;
    }

    return roleId;
  }

  static async add(firstName, lastName, role, manager) {
    // employee’s first name, last name, role, and manager, and that employee is added to the database

    const newRole = role.substr(role.indexOf(":") + 2);
    const roleId = await Role.getRoleID(newRole);

    let managerId = null;
    if (manager !== "None") {
      const managerName = manager
        .substr(manager.indexOf(":") + 2)
        .split(" ");
      managerId = await Employee.getEmployeeID(
        managerName[0],
        managerName[1]
      );
    }

    if (roleId !== 0) {
      const results = await db.execute(
        "INSERT INTO `employee` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES (?, ?, ?, ?)",
        [firstName, lastName, roleId, managerId]
      );

      if (results[0].affectedRows > 0) {
        console.log(
          `\n${firstName} ${lastName} added successfully at ID #${results[0].insertId}.\n`
        );
      } else {
        console.log("\nFailure adding a new employee.\n");
      }
    } else {
      console.log("\nEmployee not found.\n");
    }
  }

  static async updateRole(employeeID, newRoleID) {
    // employee to update and their new role and this information is updated in the database
  }
}

module.exports = Employee;
