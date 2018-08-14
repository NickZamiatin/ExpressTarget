
exports.up = function(knex) {
  return knex.schema.createTable('timemangment', (table)=>{
    table.increments();
    table.datetime('date').notNullable()
    table.string('title').notNullable()
    table.string('notes').notNullable()
    table.bool('done')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('timemangment');
};
