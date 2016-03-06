
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table) {
    table.increments();
    table.text('text');
    table.string('reviewer_name');
    table.date('created_date');
    table.date('modified_date');
    table.integer('restaurant_id');
    table.float('rating');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
