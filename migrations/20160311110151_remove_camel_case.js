
exports.up = function(knex, Promise) {
  return knex.schema.table('github_users', function(table) {
    table.dropColumn('githubId');
    table.string('github_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('github_users', function(table) {
    table.dropColumn('github_id');
    table.string('githubId');
  });
};
