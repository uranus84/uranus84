const mysql = require('mysql');

// Create a db connection & export it from this file

// connection set up to route to ClearDB database on heroku
let dbConnection = mysql.createConnection({
  user: 'root',
  database: 'choreApp'
});

dbConnection.connect();

module.exports = dbConnection;