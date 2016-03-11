
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('email');
  })
  .then(function() {
    return knex.schema.createTable('github_users', function(table) {
      table.string('githubId');
      table.integer('user_id').references('id').inTable('users');
    });
  });
};

exports.down = function(knex, Promise) {

};
