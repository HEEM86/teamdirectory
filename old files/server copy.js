const inquirer = require("inquirer");
const fs = require("fs");


const connection = require("./connection.js");

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  viewDeparments();
  viewEmployees();
  setTimeout(beginQuestions, 1000);
});

//Declaring global variables
const teamMembers = [];


function viewDeparments (){
  connection.query("SELECT * FROM department", function(err, res, fields){
    if (err) throw err;
    console.table(res);
  })
}


function viewEmployees (){
  connection.query("SELECT * FROM employee", function(err, res, fields){
    if (err) throw err;
    console.table(res);
  })
}



function beginQuestions()  {
  inquirer.prompt([
    {
      type: "list",
      name: "question",
      message: "What would you like to do?",
      choices: [
              "View all deparments",
              "Add a deparment",
              "Add Employee",
              "View all Employees",
              "Remove Employee",
              "Add a role",
              "View Manager"
             ]

    },
  ]).then(choices =>{
    switch(choices.question) {
      case "View all departments":
          viewDeparments()
        break;

      case "Add a deparment":
          addDepartment()
        break;

      case "Add Employee":
          addEmployee()
        break;

      case "View all Employees":
          viewEmployees()
        break;

      case "Remove Employee":
          removeEmployee()
        break;

      case "Add Role":
          addRole()
        break;

      case "View Manager":
          viewManager()
        break;


    };
  });

};





function addDepartment() {
connection.query("INSERT INTO department SET ?", {name: name},

  function(err) {
    if (err) throw err;
    console.log("Your department was created successfully!");
    // re-prompt the user for if they want to bid or post
    beginQuestions();
  }
)};

  