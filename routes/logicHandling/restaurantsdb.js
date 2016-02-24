var connectionString = require('../../config.js');
var path = require('path');
var pg = require('pg');
var escape = require('pg-escape');
function getRestaurants(callback, res, parameters) {
  var queryString = 'select * from restaurants';
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
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
       done();
       callback(res, results);
    });
  });
}


module.exports = getRestaurants;
