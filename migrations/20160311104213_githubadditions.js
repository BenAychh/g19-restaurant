
exports.up = function(knex, Promise) {
  return knex.schema.table('github_users', function(table) {
    table.string('profileUrl');
    table.string('displayName');
    table.string('username');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('github_users', function(table) {
    table.dropColumn('profileUrl');
    table.dropColumn('displayName');
    table.dropColumn('username');
  });
};
