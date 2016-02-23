var connectionString = require('../../config.js');
var path = require('path');
var pg = require('pg');
var escape = require('pg-escape');
function getRestaurants(res, page, pOptions, parameters) {
  var queryString = 'select * from restaurants';
  var first = true;
  var options = pOptions;
  if (parameters) {
    var parameterKeys = Object.keys(parameters);
    parameterKeys.forEach(function(key) {
      if (first) {
        queryString += ' WHERE ';
        first = false;
      } else {
        queryString += ' AND ';
      }
      queryString += escape('%I = %L', key, parameters[key]);
    });
  }
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
       options = replace(options, row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
       done();
       options.restaurants = results;
       res.render(page, options);
    });
  });
}
function replace(options, results) {
  var returningObject = {};
  var keys = Object.keys(options);
  keys.forEach(function(key) {
    returningObject[key] = options[key]
      .split('{name}').join(results.name)
      .split('{image}').join(results.image)
      .split('{cuisine}').join(results.cuisine)
      .split('{city}').join(results.city)
      .split('{state}').join(results.state)
      .split('{rating}').join(results.rating)
      .split('{description}').join(results.description);
  });
  return returningObject;
}

module.exports = getRestaurants;
