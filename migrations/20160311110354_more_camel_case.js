
exports.up = function(knex, Promise) {
  return knex.schema.table('github_users', function(table) {
    table.dropColumn('displayName');
    table.dropColumn('profileUrl');
    table.string('display_name');
    table.string('profile_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('github_users', function(table) {
    table.string('displayName');
    table.string('profileUrl');
    table.dropColumn('display_name');
    table.dropColumn('profile_url');
  });
};
