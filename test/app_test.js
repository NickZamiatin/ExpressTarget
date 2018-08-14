const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');
const app = require('../app');
const examplesTest = require('./examplesTest')
describe('CRUD Capstone', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        return knex.seed.run();
      }).then(() => done());
  })
  
  it ('Get All',(done)=>{
    request(app)
      .get('/api/v1/targets')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(examplesTest.targets);
        done();
    });
  });
  
  
})