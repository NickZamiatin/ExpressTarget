exports.seed = async function (knex) {
  await knex.raw('ALTER SEQUENCE timemangment_id_seq RESTART with 5');
  await knex('timemangment').del();
  return knex('timemangment').insert([
    {
      "user_id": 1,
      "title": "Find a Job",
      "date": "2018-10-01T00:00:00.000Z",
      "id": "1",
      "notes": "users note",
      "done": false
    },
    {
      "user_id": 2,
      "title": "Demo a Capstone ",
      "date": "2018-08-17T13:45:18.000Z",
      "id": "2",
      "notes": "users note",
      "done": false
    },
    {
      "user_id": 1,
      "title": "Past push to Delete",
      "date": "2018-05-31T23:58:24.000Z",
      "id": "4",
      "notes": "users note",
      "done": false
    },
    {
      "user_id": 1,
      "title": "Living from home",
      "date": "2018-10-01T10:09:24.000Z",
      "id": "3",
      "notes": "users note",
      "done": false
    }
  ]);
};