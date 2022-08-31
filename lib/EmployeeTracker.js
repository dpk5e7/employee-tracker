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
  start() {
    this.displayMenu();
  }

  displayMenu() {
    // view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

    console.log(`------ Menu ------\n`);

    const menu = [
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee's Role",
          "Exit",
        ],
        name: "choice",
      },
    ];
    inquirer.prompt(menu).then((answer) => {
      switch (answer.choice) {
        case "View All Departments":
          this.viewAllDepartments();
          break;
        case "View All Roles":
          this.viewAllRoles();
          break;
        case "View All Employees":
          this.viewAllEmployees();
          break;
        case "Add a Department":
          this.addDepartment();
          break;
        case "Add a Role":
          this.addRole();
          break;
        case "Add an Employee":
          this.addEmployee();
          break;
        case "Update an Employee's Role":
          this.updateEmployeeRole();
          break;
        default:
          // Exit the program
          console.log("\nSo long and thanks for all the fish.");
          break;
      }
    });
  }

  async viewAllDepartments() {
    // a formatted table showing department names and department ids
    console.log("\n------ View All Departments ------");
    await Department.viewAll();

    // Return to menu
    this.displayMenu();
  }

  async viewAllRoles() {
    // job title, role id, the department that role belongs to, and the salary for that role
    console.log("\n------ View All Roles ------");
    await Role.viewAll();

    // Return to menu
    this.displayMenu();
  }

  async viewAllEmployees() {
    // a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    console.log("\n------ View All Employees ------");
    await Employee.viewAll();

    // Return to menu
    this.displayMenu();
  }

  async addDepartment() {
    // prompted to enter the name of the department and that department is added to the database
    console.log("\n------ Add a Department ------");

    const questions = [
      {
        type: "input",
        message: "What would you like to name the new Department?",
        name: "name",
      },
    ];

    await inquirer.prompt(questions).then(async (answers) => {
      await Department.add(answers.name);
    });

    // Return to menu
    this.displayMenu();
  }

  async addRole() {
    // prompted to enter the name, salary, and department for the role and that role is added to the database
    console.log("\n------ Add a Role ------");

    const arrDepartments = await Department.getArrayOfDepartments();

    const questions = [
      {
        type: "input",
        message: "What would you like to title the new Role?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the salary for the new Role?",
        name: "salary",
      },
      {
        type: "list",
        message: "Which Department is this role located in?",
        choices: arrDepartments,
        name: "department",
      },
    ];

    await inquirer.prompt(questions).then(async (answers) => {
      await Role.add(answers.title, answers.salary, answers.department);
    });

    // Return to menu
    this.displayMenu();
  }

  async addEmployee() {
    // prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
    console.log("\n------ Add an Employee ------");

    // Return to menu
    this.displayMenu();
  }

  async updateEmployeeRole() {
    // prompted to select an employee to update and their new role and this information is updated in the database
    console.log("\n------ Update an Employee's Role ------");

    // Return to menu
    this.displayMenu();
  }
}

module.exports = EmployeeTracker;
