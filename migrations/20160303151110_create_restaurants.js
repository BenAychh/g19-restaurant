
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function(table) {
    table.increments();
    table.string('name');
    table.string('image');
    table.string('city');
    table.string('state');
    table.text('description');
    table.integer('cuisine_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
