const mysql = require('mysql');

// Create a db connection & export it from this file

// connection set up to route to ClearDB database on heroku
// need to connect to user 'root', no password, and to db 'choreApp'
let dbConnection = mysql.createConnection({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'b912fe68a70b8b',
  password: '35dc2118',
  database: 'heroku_49fb8337b7fd0ce'
  user: 'root',
  database: 'choreApp',
  stringifyObjects: true,
});

dbConnection.connect();

module.exports = dbConnection;
