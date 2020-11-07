const inquirer = require("inquirer");
const fs = require("fs");

const connection = require("./connection.js");

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  viewDepartments();
  viewEmployees();
  setTimeout(beginQuestions, 1000);
});

//Declaring global variables
const teamMembers = [];

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, res, fields) {
    if (err) throw err;
    console.table(res);
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res, fields) {
    if (err) throw err;
    console.table(res);
  });
}

function beginQuestions() {
  inquirer
    .prompt([
      {
        name: "questions",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "Add a department",
          "Add Employee",
          "View all Employees",
          "Remove Employee",
          "Add a role",
          "View Manager"
        ],
      },
    ])
    .then(function (choice) {
      console.log("choice is: ");
      console.log(choice);
      if (choice.questions === "View all department") {
        viewDepartments();
      } else if (choice.questions === "Add a department") {
        addDepartment();
      } else if (choice.questions === "Add Employee") {
        addEmployee();
      } else if (choice.questions === "View all Employees") {
        viewEmployees();
      } else if (choice.questions === "Remove Employee") {
        removeEmployee();
      } else if (choice.questions === "View Manager") {
        viewManager();
      } else {
        connection.end();
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "dept_name",
      type: "input",
      message: "What is Department name?",
    })
    .then(function (answer) {
      console.log("answer is: ");
      console.log(answer);
      var deptName = answer.dept_name;
      console.log(deptName + " has been added!\n");
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: deptName,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res);
        }
      );
    });
}
