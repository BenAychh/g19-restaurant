
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cuisines', function(table) {
    table.increments();
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cuisines');
};
