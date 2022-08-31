require("dotenv").config();

const EmployeeTracker = require("./lib/EmployeeTracker");

const et = new EmployeeTracker();

et.start();
