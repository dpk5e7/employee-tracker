// Third Party
const mysql = require("mysql2");

class Employee {
  constructor() {}

  static viewAll() {
    // a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  }

  static add(firstName, lastName, role, manager) {
    // employee’s first name, last name, role, and manager, and that employee is added to the database
  }

  static updateRole(employeeID, newRoleID) {
    // employee to update and their new role and this information is updated in the database
  }
}

module.exports = Employee;
