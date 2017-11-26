const mysql = require('mysql');

// Create a db connection pool & export it from this file

// pool set up to route to ClearDB database on heroku
// pool is a set of connections that cycles through when the previous one breaks,
// used because ClearDB kills connection if idle, which is a bad no-no for us
var dbPool = mysql.createPool({
  connectionLimit: 10,
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'b912fe68a70b8b',
  password: '35dc2118',
  database: 'heroku_49fb8337b7fd0ce',
  // Info commented below links to local db for testing purposes, above data is for production
  // user: 'root',
  // database: 'choreApp',
  stringifyObjects: true,
})

dbPool.getConnection(function(err, connection) {
  if (err) { console.error(err); }
})

module.exports = dbPool;
