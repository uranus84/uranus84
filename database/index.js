const mysql = require('mysql');

// Create a db connection & export it from this file

// need to connect to user 'root', no password, and to db 'choreApp'
let dbConnection = mysql.createConnection({
  user: 'root',
  database: 'choreApp'
});

dbConnection.connect();

module.exports = dbConnection;