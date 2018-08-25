exports.up = function(knex, Promise) {
  return knex.schema.table('timemangment', table => {
    table.integer('user_id').references('users.id').unsigned().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('timemangment', table => {
    table.dropColumn('user_id');
  });
};
