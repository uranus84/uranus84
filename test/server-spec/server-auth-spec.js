const mysql = require('mysql');
const app = require('../../server/index.js').app;
const request = require('supertest');
const dbConnection = require('../../database/index.js');

// currently, tests can only be run on completely empty db, need to refactor to use testing db instead of staging db

// need to disconnect from db after each test, currently making 4 connections each test,
// max of 10 connections, can only test twice before having to manually kill connections in db

describe('Server Auth Routes', () => {
  describe('POST to signup', () => {
    it('Sends 200 status to client on authentication success', (done) => {
      dbConnection.query(`DELETE FROM users where user_name = 'auth-test'`);
      dbConnection.query(`ALTER TABLE users AUTO_INCREMENT = 1`);
      var user = { username: 'auth-test', password: 'auth-test' };

      request(app)
        .post('/signup')
        .send(user)
        .expect(200, done)
        .expect(function(res) {
          var expected = { view: 'home', user_id: 1};
          if (res.text !== JSON.stringify(expected)) {
            throw new Error(`Response data is not correct, expected: ${JSON.stringify(expected)}, received: ${res.text}`);
          }
        });
    });
    it('Sends 401 Unauthorized on authentication failure or user already existing', (done) => {
      var user = { username: 'auth-test', password: 'auth-test' };

      request(app)
        .post('/signup')
        .send(user)
        .expect(401, done);
    });
  });
  // describe('POST to login', () => {
  //   it('Sends 200 status to client on authentication success', () => {

  //   });
  //   it('Sends 401 Unauthorized on authentication failure', () => {

  //   });
  // });
  // describe('GET to logout', () => {
  //   it('Removes user and session info from cookies', () => {

  //   });
  //   it('Sends {view: home} to client', () => {

  //   });
  // });
});