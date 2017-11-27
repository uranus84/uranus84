/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql');
const expect = require('chai').expect;
const request = require('request');

const modelDB = require('../../database/model.js');

// require the modelDB in order to run those functions

describe('TidyUp', () => {
  let dbConnection;

  beforeEach((done) => {
    dbConnection = mysql.createConnection({
      user: 'root',
      database: 'choreApp',
    });
    dbConnection.connect();

    // Empy the tables. Since users is a foreign key,
    // delete all items from table and reset auto-increment.
    dbConnection.query('TRUNCATE chores', () => {
      dbConnection.query('DELETE FROM users', () => {
        dbConnection.query('ALTER TABLE users AUTO_INCREMENT = 1', done);
      });
    });
  });

  afterEach(() => {
    dbConnection.end();
  });

  it('should insert users to the DB', (done) => {
    const userQ = 'INSERT INTO users (user_name, password) VALUES ("testUser1", "testPassword1")';
    dbConnection.query(userQ, () => {
      dbConnection.query('SELECT * FROM users WHERE user_name = "testUser1"', (err, results) => {
        expect(results.length).to.equal(1);
        done();
      });
    });
  });

  it('should insert chores to the DB', (done) => {
    // const userQ = 'INSERT INTO users (user_name, password) VALUES ("testUser1", "testPassword1")';
    const choreCols = '(chore_name, next_date, frequency, user_id)';
    const choreVals = '("test chore", "2017-11-27", "daily", 1)';
    const choreQ = `INSERT INTO chores ${choreCols} VALUES ${choreVals}`;

    // insert user
    dbConnection.query('INSERT INTO users (user_name, password) VALUES ("testUser1", "testPassword1")', () => {
      dbConnection.query(choreQ, () => {
        dbConnection.query('SELECT * FROM chores WHERE user_id = 1', (err, results) => {
          expect(results.length).to.equal(1);
          done();
        });
      });
    });
  });

  // it('should insert the chores to the DB', (done) => {
  // // post the new chore into the DB
  //   request({
  //     method: 'POST',
  //     uri: 'http://localhost:3000/chores',
  //     json: {},
  //   }, () => {
  //     // Now if we look into the database,we should find the new chore
  //     const queryString = 'SELECT * FROM chores';
  //     const queryArgs = [];
  //     dbPool.query(queryString, queryArgs, (err, results) => {
  //       // Should have one result:
  //       expect(results.length).to.equal(1);
  //       // TODO: If you don't have a column named text, change this test.
  //       expect(results[0].chore_name).to.equal('');
  //       done();
  //     });
  //   });
  // });

  // it('should delete chores from the DB', (done) => {

  // });

  // it('should update chores upon completion', (done) => {

  // });

  // it('should edit chores in the DB', (done) => {

  // });
});
