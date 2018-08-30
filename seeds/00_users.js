
const bcrypt = require('bcrypt');
exports.seed = (knex, Promise) => {
  return knex.raw('DELETE FROM "users"; ALTER SEQUENCE users_id_seq RESTART WITH 3')
    .then(() => {
      
      const users = [
        {
          id: 1,
          email: 'nickzamiatin@gmail.com',
          password: bcrypt.hashSync('123456', 7)
        },
        {
          id: 2,
          email: 'hello@cjr.co.de',
          password: bcrypt.hashSync('keyboard_cat', 7)
        }
      ]
      return knex('users').insert(users)
    })
};
