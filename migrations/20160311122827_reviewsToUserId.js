
exports.up = function(knex, Promise) {
  return knex.schema.table('reviews', function(table) {
    table.dropColumn('reviewer_name');
    table.integer('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  table.dropColumn('user_id');
  table.string('reviewer_name');
};
