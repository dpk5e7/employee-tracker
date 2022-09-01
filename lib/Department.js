const cTable = require("console.table");
const db = require("./DBPool");

class Department {
  constructor() {}

  /**
   * Function to show a formatted table showing department names and department ids
   */
  static async viewAll() {
    const results = await db.execute(
      `SELECT id AS ID, name AS Name FROM department`
    );

    const table = cTable.getTable(results[0]);
    console.log("\n");
    console.log(table);
  }

  /**
   * Function to return an array of Department names
   * @returns {[string]} An array of strings
   */
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

  /**
   * Function to get a Department's ID from it's name.  Returns 0 if not found.
   * @param {string} name The name of the Department
   * @returns {int} id
   */
  static async getDepartmentID(name) {
    const results = await db.execute(
      "SELECT `id` FROM `department` WHERE `name` = ?",
      [name]
    );

    let departmentId = 0;
    if (results) {
      departmentId = results[0][0].id;
    }

    return departmentId;
  }

  /**
   * Function to add a new Department to the database
   * @param {string} name The desired name of the new Department
   */
  static async add(name) {
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

  /**
   * Function to delete a department.
   * @param {string} department The name of the department to be deleted.
   */
  static async delete(department) {
    const departmentId = await Department.getDepartmentID(department);

    if (departmentId !== 0) {
      const results = await db.execute(`DELETE FROM department WHERE id = ?`, [
        departmentId,
      ]);
      if (results[0].affectedRows > 0) {
        console.log(`\n${department} deleted successfully.\n`);
      } else {
        console.log("\nFailure deleting an employee.\n");
      }
    } else {
      console.log("\nDepartment not found.\n");
    }
  }
}

module.exports = Department;
