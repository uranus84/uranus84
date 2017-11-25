const mysql = require('mysql');

// Create a db connection & export it from this file

// connection set up to route to ClearDB database on heroku

/*******************DATABASE FOR HEROKU*******************/
// let dbConnection = mysql.createConnection({
//   host: 'us-cdbr-iron-east-05.cleardb.net',
//   user: 'b912fe68a70b8b',
//   password: '35dc2118',
//   database: 'heroku_49fb8337b7fxd0ce'
// });

/******************DATABASE FOR LOCAL*********************/
let dbConnection = mysql.createConnection({
  user: 'root',
  database: 'choreApp'
});

dbConnection.connect();

module.exports = dbConnection;