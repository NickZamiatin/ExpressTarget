const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');
const app = require('../app');
const examplesTest = require('./examplesTest');

describe('CRUD Capstone', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        return knex.seed.run();
      }).then(() => done());
  });
  
  it ('Get All targets',(done)=>{
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
  it ('Get One target by id',(done)=>{
    request(app)
      .get('/api/v1/targets/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(examplesTest.targets[0]);
        done();
    });
  });
  it ('Get One target by id',(done)=>{
    request(app)
      .get('/api/v1/targets/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(examplesTest.targets[1]);
        done();
    });
  });
  it ('Create new target',(done)=>{
    request(app)
      .post('/api/v1/targets')
      .send(examplesTest.target)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        examplesTest.id = response.body.id;
        expect(response.body).to.deep.equal(examplesTest.target);
        done();
    });
  });
  it ('Update target',(done)=>{
    examplesTest.target.title = "Test works and Update"
    request(app)
      .put('/api/v1/targets/11')
      .send(examplesTest.target)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        examplesTest.target.id = response.body.id;
        expect(response.body).to.deep.equal(examplesTest.target);
        done();
    });
  });
  it ('Delete target',(done)=>{
    request(app)
      .delete('/api/v1/targets/11')
      .send(examplesTest.target)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal({
          deleted: true
        });
        done();
    });
  });

})