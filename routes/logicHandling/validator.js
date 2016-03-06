var queries = require('./queries.js');

function uniqueRestaurant(params, currentID) {
  return queries.getRestaurants(params)
  .then(function(results) {
    console.log(results);
    if (results.length === 0) {
      return Promise.resolve();
    }
    if (currentID && results.length === 1) {
      console.log(results[0].id + ' / ' + currentID);
      if (results[0].id == currentID) {
        return Promise.resolve();
      }
    }
    return Promise.reject('That restaurant already exists!');
  });
}
function uniqueReviewer(params) {
  return queries.getReviews(params)
  .then(function(results) {
    console.log('results: results');
    if (results.length === 0) {
      return Promise.resolve();
    } else {
      return Promise.reject('You have already reviewed this restaurant');
    }
  });
}

module.exports = {
  uniqueRestaurant: uniqueRestaurant,
  uniqueReviewer: uniqueReviewer
};
