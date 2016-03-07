
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cuisines', function(table) {
    table.increments();
    table.string('name');
  })
  .then(function() {
    return knex.schema.createTable('restaurants', function(table) {
      table.increments();
      table.string('name');
      table.string('image');
      table.string('city');
      table.string('state');
      table.text('description');
      table.integer('cuisine_id').references('id').inTable('cuisines');
    });
  }).
  then(function() {
    return knex.schema.createTable('reviews', function(table) {
      table.increments();
      table.text('text');
      table.string('reviewer_name');
      table.date('created_date');
      table.date('modified_date');
      table.integer('restaurant_id').references('id').inTable('restaurants');
      table.float('rating');
    });
  })
  .catch(function (err) {
    Promise.reject('Something went wrong: ' + err);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews')
  .then(function() {
    return knex.schema.dropTable('restaurants');
  })
  .then(function() {
    return knex.schema.droptable('cuisines');
  });
};
