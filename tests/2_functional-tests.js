const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite('Routing Tests', function() {
        suite('Get /api/convert => conversion object', function() {
            test('Convert 10L (valid input)', function(done) {
                chai.request(server)
                  .get('/api/convert')
                  .query({input: '10L'})
                  .end((error, response) => {
                    assert.equal(response.status, 200)
                    assert.equal(response.body.initNum, 10)
                    assert.equal(response.body.initUnit, 'L')
                    assert.approximately(response.body.returnNum, 2.64172, 0.1)
                    assert.equal(response.body.returnUnit, 'gal')
                })
                done();
              });

            test('Convert 32g (invalid input unit)', function(done) {
                chai.request(server)
                  .get('/api/convert')
                  .query({input: '32g'})
                  .end((error, response) => {
                  assert.equal(response.body, 'invalid unit')
                })
                done();
              });

            test('Convert 3/7.2/4kg (invalid number)', function(done) {
                chai.request(server)
                  .get('/api/convert')
                  .query({input: '3/7.2/4kg'})
                  .end((error, response) => {
                  assert.equal(response.body, 'invalid number')
                })
                done();
            });

            test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
                chai.request(server)
                  .get('/api/convert')
                  .query({input: '3/7.2/4kilomegagram'})
                  .end((error, response) => {
                  assert.equal(response.body, 'invalid number and unit')
                })
                done();
            });

            test('Convert kg (no number)', function(done) {
                chai.request(server)
                  .get('/api/convert')
                  .query({input: 'kg'})
                  .end((error, response) => {
                  assert.equal(response.body.returnNum, 2.20462)
                })
                done();
            });
        })
    })
});
