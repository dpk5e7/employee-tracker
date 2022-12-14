const cTable = require("console.table");
const db = require("./DBPool");
const Role = require("./Role");
const Department = require("./Department");

class Employee {
  constructor() {}

  /**
   * Function to show a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, managers that the employees report to, and the total budget of the organization
   */
  static async viewAll() {
    const results = await db.execute(
      `SELECT E1.id AS ID, E1.first_name AS "First Name", E1.last_name AS "Last Name", role.title AS "Role", role.salary AS "Salary", CONCAT(E2.first_name, ' ', E2.last_name) AS "Manager" 
      FROM employee E1 
      LEFT JOIN role ON E1.role_id = role.id 
      LEFT JOIN employee E2 ON E1.manager_id = E2.id`
    );

    const table = cTable.getTable(results[0]);
    console.log("\n");
    console.log(table);

    const results2 = await db.execute(
      `SELECT SUM(role.salary) AS Budget 
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id`
    );

    console.log(`Total Budget: $${results2[0][0].Budget}\n`);
  }

  /**
   * Function to return an array of Employee names
   * @returns {[string]} An array of strings
   */
  static async getArrayOfEmployees() {
    const results = await db.execute(
      `SELECT CONCAT(first_name, ' ', last_name) AS Name 
      FROM employee 
      ORDER BY Name`
    );

    let employeeNames = [];
    if (results) {
      for (const employee of results[0]) {
        employeeNames.push(employee.Name);
      }
    }

    return employeeNames;
  }

  /**
   * Function to return an array of Manager names
   * @returns {[string]} An array of strings
   */
  static async getArrayOfManagers() {
    const results = await db.execute(
      `SELECT DISTINCT CONCAT(Manager.first_name, ' ', Manager.last_name) AS Name 
      FROM employee 
      INNER JOIN employee Manager ON employee.manager_id = Manager.id ORDER BY Name`
    );

    let managerNames = [];
    if (results) {
      for (const manager of results[0]) {
        managerNames.push(manager.Name);
      }
    }

    return managerNames;
  }

  /**
   * Function to get an Employee's ID from their name.  Returns 0 if not found.  Yes, this assumes that there are no duplicate names in the organization.
   * @param {string} firstName The employee's first name
   * @param {string} lastName The employee's last name
   * @returns {int} id
   */
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

  /**
   * Function to add a new employee to the database
   * @param {string} firstName The employee's first name
   * @param {string} lastName The employee's last name
   * @param {string} role The new employee's desired role
   * @param {string} manager The new employee's desired manager, can be None
   */
  static async add(firstName, lastName, role, manager) {
    const roleId = await Role.getRoleID(role);

    let managerId = null;
    if (manager !== "None") {
      const managerName = manager.split(" ");
      managerId = await Employee.getEmployeeID(managerName[0], managerName[1]);
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

  /**
   * Function to update an employee's role in the organization
   * @param {string} employee The employee's name, first name <space> last name
   * @param {string} role The employee's new role title
   */
  static async updateRole(employee, role) {
    // employee to update their role and this information is updated in the database
    const roleId = await Role.getRoleID(role);

    const employeeName = employee.split(" ");
    const employeeId = await Employee.getEmployeeID(
      employeeName[0],
      employeeName[1]
    );

    if (roleId !== 0 && employeeId !== 0) {
      const results = await db.execute(
        "UPDATE `employee` SET `role_id` = ? WHERE id = ?",
        [roleId, employeeId]
      );

      if (results[0].affectedRows > 0) {
        console.log(
          `\n${employeeName[0]} ${employeeName[1]} is now a ${role}.\n`
        );
      } else {
        console.log("\nFailure updating the employee's role.\n");
      }
    } else {
      console.log("\nEmployee or Role not found.\n");
    }
  }

  /**
   * Function to update an employee's manager
   * @param {string} employee The employee's name, first name <space> last name
   * @param {string} manager The employee's new manager name
   */
  static async updateManager(employee, manager) {
    // employee to update their manager and this information is updated in the database

    const employeeName = employee.split(" ");
    const employeeId = await Employee.getEmployeeID(
      employeeName[0],
      employeeName[1]
    );

    let managerId = null;
    if (manager !== "None") {
      const managerName = manager.split(" ");
      managerId = await Employee.getEmployeeID(managerName[0], managerName[1]);
    }

    if (employeeId !== 0) {
      const results = await db.execute(
        "UPDATE `employee` SET `manager_id` = ? WHERE id = ?",
        [managerId, employeeId]
      );

      if (results[0].affectedRows > 0) {
        console.log(
          `\n${employeeName[0]} ${employeeName[1]} is now managed by ${manager}.\n`
        );
      } else {
        console.log("\nFailure updating the employee's manager.\n");
      }
    } else {
      console.log("\nEmployee not found.\n");
    }
  }

  /**
   * Function to show a formatted table showing a particular manager's employee data, including employee ids, first names, last names, job titles, departments, salaries, managers that the employees report to, and the manager's total budget
   * @param {string} manager The manager's name
   */
  static async viewByManager(manager) {
    const managerName = manager.split(" ");
    const managerId = await Employee.getEmployeeID(
      managerName[0],
      managerName[1]
    );

    const results = await db.execute(
      `SELECT E1.id AS ID, E1.first_name AS "First Name", E1.last_name AS "Last Name", role.title AS "Role", role.salary AS "Salary", CONCAT(E2.first_name, ' ', E2.last_name) AS "Manager" 
      FROM employee E1 JOIN role ON E1.role_id = role.id 
      LEFT JOIN employee E2 ON E1.manager_id = E2.id 
      WHERE E1.manager_id = ?`,
      [managerId]
    );

    const table = cTable.getTable(results[0]);
    console.log("\n");
    console.log(table);

    const results2 = await db.execute(
      `SELECT SUM(role.salary) AS Budget 
      FROM employee E1 JOIN role ON E1.role_id = role.id 
      LEFT JOIN employee E2 ON E1.manager_id = E2.id 
      WHERE E1.manager_id = ?`,
      [managerId]
    );

    console.log(`Total Budget: $${results2[0][0].Budget}\n`);
  }

  /**
   * Function to show a formatted table showing a particular department's employee data, including employee ids, first names, last names, job titles, departments, salaries, managers that the employees report to, and the department's total budget
   * @param {string} department The department's name
   */
  static async viewByDepartment(department) {
    const departmentId = await Department.getDepartmentID(department);

    const results = await db.execute(
      `SELECT E1.id AS ID, E1.first_name AS "First Name", E1.last_name AS "Last Name", role.title AS "Role", role.salary AS "Salary", CONCAT(E2.first_name, ' ', E2.last_name) AS "Manager" 
      FROM employee E1 
      JOIN role ON E1.role_id = role.id 
      LEFT JOIN employee E2 ON E1.manager_id = E2.id WHERE role.department_id = ?`,
      [departmentId]
    );

    const table = cTable.getTable(results[0]);
    console.log("\n");
    console.log(table);

    const results2 = await db.execute(
      `SELECT SUM(role.salary) AS Budget 
      FROM employee E1 
      JOIN role ON E1.role_id = role.id 
      LEFT JOIN employee E2 ON E1.manager_id = E2.id WHERE role.department_id = ?`,
      [departmentId]
    );

    console.log(`Total Budget: $${results2[0][0].Budget}\n`);
  }

  /**
   * Function to delete an employee
   * @param {string} employee The employee's name, first name <space> last name
   */
  static async delete(employee) {
    if (employee !== "None") {
      const employeeName = employee.split(" ");
      const employeeId = await Employee.getEmployeeID(
        employeeName[0],
        employeeName[1]
      );

      if (employeeId !== 0) {
        const results = await db.execute(`DELETE FROM employee WHERE id = ?`, [
          employeeId,
        ]);
        if (results[0].affectedRows > 0) {
          console.log(`\n${employee} deleted successfully.\n`);
        } else {
          console.log("\nFailure deleting an employee.\n");
        }
      } else {
        console.log("\nEmployee not found.\n");
      }
    }
  }
}

module.exports = Employee;
