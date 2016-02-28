var query = require('./databaseInterface');
var path = require('path');
var pg = require('pg');
var escape = require('pg-escape');
function getRestaurants(callback, res, parameters) {
  var queryString =
  'select restaurants.name, image, city, state, ' +
      'avg(reviews.rating) as rating, description, restaurants.id, ' +
      'cuisine_id, cuisines.name as cuisine_name ' +
  'from restaurants ' +
    'inner join cuisines on ' +
      'restaurants.cuisine_id = cuisines.id ' +
    'left join reviews on ' +
	    'restaurants.id = reviews.restaurant_id ';
  var first = true;
  if (parameters) {
    var parameterKeys = Object.keys(parameters);
    parameterKeys.forEach(function(key) {
      if (first) {
        queryString += ' WHERE ';
        first = false;
      } else {
        queryString += ' AND ';
      }
      queryString += escape('restaurants.%I = %L', key, parameters[key]);
    });
  }
  queryString +=
  'group by restaurants.name, image, city, state, description, ' +
      'restaurants.id, cuisine_id, cuisines.name';
  queryString += ';';
  query(queryString, '', function(error, results) {
    var resultsArray = [];
    results.rows.forEach(function(row) {
      resultsArray.push(row);
    });
    callback(res, resultsArray);
  });
}


module.exports = getRestaurants;
