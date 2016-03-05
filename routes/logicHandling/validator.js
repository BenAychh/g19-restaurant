var queries = require('./queries.js');

function uniqueRestaurant(params) {
  console.log(params);
  return queries.getRestaurants(params)
  .then(function(results) {
    console.log(results);
    if (results.length === 0) {
      return Promise.resolve();
    } else {
      return Promise.reject('Restaurant name is not unique');
    }
  });
}

module.exports = {
  uniqueRestaurant: uniqueRestaurant
};
