const mysql = require('mysql');
const server = require('../../server/index.js');
const request = require('supertest');


describe('Server Auth Routes', () => {
  describe('POST to signup', () => {
    it('Sends {view: home} to client on authentication success', () => {
      
    });
    it('Sends 401 Unauthorized on authentication failure', () => {

    });
  });
  describe('POST to login', () => {
    it('Sends {view: home} to client on authentication success', () => {

    });
    it('Sends 401 Unauthorized on authentication failure', () => {

    });
  });
  describe('GET to logout', () => {
    it('Removes user and session info from cookies', () => {

    });
    it('Sends {view: home} to client', () => {

    });
  });
});