const cTable = require("console.table");
const db = require("./DBPool");
const Department = require("./Department");

class Role {
  constructor() {}

  /**
   * Function to show a formatted table showing job title, role id, the department that role belongs to, and the salary for that role
   */
  static async viewAll() {
    const results = await db.execute(
      `SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department 
      FROM role 
      LEFT JOIN department ON department.id = role.department_id`
    );

    const table = cTable.getTable(results[0]);
    console.log("\n");
    console.log(table);
  }

  /**
   * Function to return an array of Role titles
   * @returns {[string]} An array of strings
   */
  static async getArrayOfRoles() {
    const results = await db.execute(
      `SELECT role.title AS Title 
      FROM role 
      ORDER BY role.title`
    );

    let roles = [];
    if (results) {
      for (const employee of results[0]) {
        roles.push(employee.Title);
      }
    }

    return roles;
  }

  /**
   * Function to get a Role's ID from it's title.  Returns 0 if not found.
   * @param {string} title The title of the Role
   * @returns {int} id
   */
  static async getRoleID(title) {
    const results = await db.execute(
      "SELECT `id` FROM `role` WHERE `title` = ?",
      [title]
    );

    let roleId = 0;
    if (results) {
      roleId = results[0][0].id;
    }

    return roleId;
  }

  /**
   * Function to add a new Role to the database
   * @param {string} title The desired title for the new Role
   * @param {number} salary The desired salary for the new Role
   * @param {string} departmentName The Department associated with the new Role
   */
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
        console.log("\nFailure adding a new role.\n");
      }
    } else {
      console.log("\nRole not found.\n");
    }
  }

  /**
   * Function to delete a Role
   * @param {string} role The title of the role to be deleted.
   */
  static async delete(role) {
    const roleId = await Role.getRoleID(role);

    if (roleId !== 0) {
      const results = await db.execute(`DELETE FROM role WHERE id = ?`, [
        roleId,
      ]);
      if (results[0].affectedRows > 0) {
        console.log(`\n${role} deleted successfully.\n`);
      } else {
        console.log("\nFailure deleting a role.\n");
      }
    } else {
      console.log("\nRole not found.\n");
    }
  }
}

module.exports = Role;
