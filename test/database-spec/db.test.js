/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql');
const { expect } = require('chai');
const moment = require('moment');

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
    const choreCols = '(chore_name, next_date, frequency, user_id)';
    const choreVals = '("test chore", "2017-11-27", "daily", 1)';
    const choreQ = `INSERT INTO chores ${choreCols} VALUES ${choreVals}`;

    // insert user upon which to attach a chore
    dbConnection.query('INSERT INTO users (user_name, password) VALUES ("testUser1", "testPassword1")', () => {
      dbConnection.query(choreQ, () => {
        dbConnection.query('SELECT * FROM chores WHERE user_id = 1', (err, results) => {
          expect(results.length).to.equal(1);
          done();
        });
      });
    });
  });

  it('should insert multiple chores for one user', (done) => {
    const choreCols = '(chore_name, next_date, frequency, user_id)';
    const choreOneVals = '("test chore 1", "2017-11-27", "daily", 1)';
    const choreTwoVals = '("test chore 2", "2017-11-28", "weekly", 1)';
    const choreOneQ = `INSERT INTO chores ${choreCols} VALUES ${choreOneVals}`;
    const choreTwoQ = `INSERT INTO chores ${choreCols} VALUES ${choreTwoVals}`;

    // insert user upon which to attach a chore
    dbConnection.query('INSERT INTO users (user_name, password) VALUES ("testUser1", "testPassword1")', () => {
      dbConnection.query(choreOneQ, () => {
        dbConnection.query(choreTwoQ, () => {
          dbConnection.query('SELECT * FROM chores WHERE user_id = 1', (err, results) => {
            expect(results.length).to.equal(2);
            done();
          });
        });
      });
    });
  });

  it('should delete chores from the DB', (done) => {
    const choreCols = '(chore_name, next_date, frequency, user_id)';
    const choreVals = '("test chore", "2017-11-27", "daily", 1)';
    const choreQ = `INSERT INTO chores ${choreCols} VALUES ${choreVals}`;

    // insert user upon which to attach a chore
    dbConnection.query('INSERT INTO users (user_name, password) VALUES ("testUser1", "testPassword1")', () => {
      dbConnection.query(choreQ, () => {
        dbConnection.query('DELETE FROM chores WHERE chore_name = "test chore"', () => {
          dbConnection.query('SELECT * FROM chores WHERE user_id = 1', (err, results) => {
            expect(results.length).to.equal(0);
            done();
          });
        });
      });
    });
  });

  it('should be able to update chores', (done) => {
    const choreCols = '(chore_name, next_date, frequency, user_id)';
    const choreVals = '("test chore", "2017-11-27", "daily", 1)';
    const choreQ = `INSERT INTO chores ${choreCols} VALUES ${choreVals}`;

    // insert user upon which to attach a chore
    dbConnection.query('INSERT INTO users (user_name, password) VALUES ("testUser1", "testPassword1")', () => {
      dbConnection.query(choreQ, () => {
        dbConnection.query('UPDATE chores SET next_date = "2017-11-28", last_date_completed = "2017-11-27" WHERE id = 1', () => {
          dbConnection.query('SELECT next_date FROM chores WHERE user_id = 1', (err, results) => {
            const newDate = moment(results[0].next_date).format('YYYY-MM-DD');
            expect(newDate).to.equal('2017-11-28');
            done();
          });
        });
      });
    });
  });
});
