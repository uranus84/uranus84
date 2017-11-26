let mysql = require('mysql');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

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