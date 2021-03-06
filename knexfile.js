module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/timemangment'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost:5432/test-timemangment'
  },

};
