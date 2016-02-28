var connectionString = require('../../config.js');
var query = require('./databaseInterface').query();
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
  console.log(queryString);
  pg.connect(connectionString, function(err, client, done) {
    var results = [];
    // Handle connection errors
    if(err) {
     done();
     console.log(err);
     return console.log({ success: false, data: err});
    }

    // SQL Query > Select Data
    var query = client.query(queryString);

    // Stream results back one row at a time
    query.on('row', function(row) {
       results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
       done();
       callback(res, results);
    });
  });
}


module.exports = getRestaurants;
