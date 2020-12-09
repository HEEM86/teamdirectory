const inquirer = require("inquirer");
const fs = require("fs");

const connection = require("./connection.js");

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  // viewDepartments();
  viewEmployees();
  setTimeout(beginQuestions, 1000);
});

//Declaring global variables
const teamMembers = [];

function viewDepartments() {
  console.log("hello")
  connection.query("SELECT * FROM department", function (err, res, fields) {
    console.log(res)
    if (err) throw err;
    console.table(res);
    
  });
  beginQuestions()
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
          "Add a Role",
          "View Manager"
        ],
      },
    ])
    .then(function (choice) {
      console.log("choice is: ");
      console.log(choice);
      if (choice.questions === "View all departments") {
        console.log("test")
        viewDepartments();
      } else if (choice.questions === "Add a department") {
        addDepartment();
      } else if (choice.questions === "Add Employee") {
        addEmployee();
      } else if (choice.questions === "View all Employees") {
        viewEmployees();
      } else if (choice.questions === "Remove Employee") {
        removeEmployee();
      } else if (choice.questions === "Add a Role") {
        addRole();
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
      console.log("Stay with us, " + deptName + " is being added!\n");
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: deptName,
        },
        function (err, res) {
          if (err) throw err;
          console.log(deptName + " department(s) was added!\n");
        }
      )
      //console.log(query.sql);
    })
    .then (function() {
      setTimeout(beginQuestions, 1000);
    })
  
    
}



function addRole()  {
  inquirer
  .prompt([
    {
      name: "title",
      type: "input",
      message: "What is the name of the role you want to add?"
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this role?" 
    },
    {
      name: "department_id",
      type: "input",
      message: "What department id do you want to add? Choose a number betwween 1-9."  
    }
  
  ])
  .then(function (role) {
    console.log("the role is: ");
    // console.log(role);
    // console.log(role.title);
    // console.log(role.salary);
    // console.log(role.department_id);
    var roleName = role.title;
    console.log("Wait for it... " + roleName + " is now being added!\n");
    var query = connection.query(
    "INSERT INTO role SET ?",
    {
      title: role.title,
      salary: role.salary,
      department_id: role.department_id

    },
    function (err, res) {
        if (err) throw err;
         console.log(roleName + " role(s) added!\n");
       }
   )
  console.log(query.sql);
  })
  .then (function() {
    setTimeout(beginQuestions, 1000);
  })
}


  function addEmployee()  {
    inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the first name of the employee?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee?" 
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the role id of the new employee. Choose between 1-9."  
      }
    ])
    .then(function (worker) {
      console.log("the employee is: ");
      var workerName = worker.first_name;
      console.log("Wait for it... " + workerName + " is now being added!\n");
      var query = connection.query(
      "INSERT INTO employee SET ?",
      {
        first_name: worker.first_name,
        last_name: worker.last_name,
        role_id: worker.role_id
  
      },
      function (err, res) {
          if (err) throw err;
           console.log(workerName + " role(s) added!\n");
         }
     )
    console.log(query.sql);
    })
    .then (function() {
      setTimeout(beginQuestions, 1000);
    })
  };


  function removeEmployee()  {
    inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the first name of the employee you want to remove?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of the employee you want to remove?" 
      },
      {
        name: "role_id",
        type: "input",
        message: "What is the role id of the removed employee. Choose between 1-9."  
      }
    ])
    .then(function (remove) {
      console.log("the employee is: ");
      var removeName = remove.first_name;
      console.log("Wait for it... " + removeName + " is now being removed!\n");
      var query = connection.query(
      "DELETE FROM employee WHERE role ?",
      {
        first_name: remove.first_name,
        last_name: remove.last_name,
        role_id: remove.role_id
  
      },
      function (err, res) {
          if (err) throw err;
           console.log(removeName + " role(s) added!\n");
         }
     )
    console.log(query.sql);
    })
    .then (function() {
      setTimeout(beginQuestions, 1000);
    })
  };

    // For inputs that are numbers use inquire validation. Inquirer documentation on npm. 

    // use a basic input or create a function that quieres the database and grabs all of the department names and their ids and create a set of choices the allows the user to select a department without looking up the ID
  
  





 
