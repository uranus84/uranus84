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


  it('should insert the chores to the DB', (done) => {
  // post the new chore into the DB
    request({
      method: 'POST',
      uri: 'http://localhost:3000/chores',
      json: {},
    }, () => {
      // Now if we look into the database,we should find the new chore
      const queryString = 'SELECT * FROM chores';
      const queryArgs = [];
      dbConnection.query(queryString, queryArgs, (err, results) => {
        // Should have one result:
        expect(results.length).to.equal(1);
        // TODO: If you don't have a column named text, change this test.
        expect(results[0].chore_name).to.equal('');
        done();
      });
    });
  });
});
