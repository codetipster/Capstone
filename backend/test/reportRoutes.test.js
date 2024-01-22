/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env mocha */
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../index');
require('dotenv').config();

let token;

before(function (done) {
  this.timeout(5000); // Set timeout to 5000ms

  request(app)
    .post('/auth')
    .send({ username: process.env.XANDR_USERNAME, password: process.env.XANDR_PASSWORD })
    .end((err, res) => {
      token = res.body.token; // save the token
      done();
    });
});

describe('GET /fetch-report', function () {
  this.timeout(100000);
  it('responds with json', (done) => {
    request(app)
      .get('/fetch-report')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
