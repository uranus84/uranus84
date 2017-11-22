let mysql = require('mysql');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

describe('Server Auth Routes', () => {
  describe('POST to signup', () => {
    it('Redirects to login on success', () => {

    });
    it('Redirects back to signup on failure', () => {

    });
  });
  describe('POST to login', () => {
    it('Redirects to home page on success', () => {

    });
    it('Redirects back to login on failure', () => {

    });
  });
  describe('GET to logout', () => {
    it('Removes user and session info from cookies', () => {

    });
  });
});