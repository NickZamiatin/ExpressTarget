exports.seed = (knex, Promise) => {
  return knex.raw('DELETE FROM "users"; ALTER SEQUENCE users_id_seq RESTART WITH 3')
    .then(() => {
      
      const users = [
        {
          id: 1,
          email: 'nickzamiatin@gmail.com',
          password: '123456',
        },
        {
          id: 2,
          email: 'hello@cjr.co.de',
          password: 'keyboard_cat',
        }
      ]
      return knex('users').insert(users)
    })
};
