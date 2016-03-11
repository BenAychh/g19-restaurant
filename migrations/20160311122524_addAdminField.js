
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.boolean('is_admin').defaultTo('false');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('is_admin');
  });
};
