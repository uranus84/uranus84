/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql');
const expect = require('chai').expect;
const request = require('request');



describe('Persistent choreApp Server', () => {
  let dbConnection;
  beforeEach((done) => {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'choreApp',
    });
    dbConnection.connect();
    const tablename = 'chores';
    /* Empty the db table before each test so that multiple tests
      * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query(`truncate ${tablename} ${done}`);
  });
  afterEach(() => dbConnection.end());
});
