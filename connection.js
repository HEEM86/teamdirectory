const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Slice1986!",
  database: "teamdirectory_db"
});

// Make connection.


// Export connection for our ORM to use.
module.exports = connection;
