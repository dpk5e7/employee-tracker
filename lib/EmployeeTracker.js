// Third Party
const inquirer = require("inquirer");

// Custom
const Employee = require("./Employee");
const Department = require("./Department");
const Role = require("./Role");

class EmployeeTracker {
  /**
   * Constructor for the TeamProfileGenerator class.
   */
  constructor() {}

  /**
   * Entry point for the application.
   */
  start() {}

  displayMenu() {
    // view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
  }

  viewAllDepartments() {
    // a formatted table showing department names and department ids
  }

  viewAllRoles() {
    // job title, role id, the department that role belongs to, and the salary for that role
  }

  viewAllEmployees() {
    // a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  }

  addDepartment() {
    // prompted to enter the name of the department and that department is added to the database
  }

  addRole() {
    // prompted to enter the name, salary, and department for the role and that role is added to the database
  }

  updateRole() {
    // prompted to select an employee to update and their new role and this information is updated in the database
  }

  addEmployee() {
    // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
  }
}

module.exports = EmployeeTracker;
