const enviroment = process.env.NODE_ENV || 'development' ;
const knexfile = require('../knexfile');
const conectionConfig = knexfile[enviroment];
const knex = require('knex'); 

const conection = knex(conectionConfig);


module.exports =conection;